import pool from '../config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configurar Cloudinary
cloudinary.config({
    cloud_name: 'dy2vtcsog',
    api_key: '711442689722133',
    api_secret: 'ZjamkE3_IdSFjYAmoCvk_zfXVVU'
});

// Configurar multer para armazenar em memória
const storage = multer.memoryStorage();

// Configurar multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, webp)'));
        }
    }
});

// Função helper para upload no Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder: 'categories',
            transformation: [{ width: 800, height: 800, crop: 'limit' }]
        };
        
        cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(buffer);
    });
};

// POST - Criar categoria
export const createCategory = async (req, res) => {
    try {
        const { business_id, name, status } = req.body;
        let imageUrl = null;
        
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }

        if (!business_id || !name) {
            return res.status(400).json({ 
                error: 'business_id e name são obrigatórios' 
            });
        }

        const result = await pool.query(
            `INSERT INTO categories (
                business_id,
                name,
                image,
                status,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *`,
            [business_id, name, imageUrl, status || 'active']
        );

        const category = result.rows[0];
        res.status(201).json({
            message: 'Categoria criada com sucesso',
            category: {
                id: category.id,
                businessId: category.business_id,
                name: category.name,
                image: category.image,
                status: category.status,
                createdAt: category.created_at,
                updatedAt: category.updated_at
            }
        });

    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ 
            error: 'Erro ao criar categoria' 
        });
    }
};

// GET - Listar categorias
export const getCategories = async (req, res) => {
    try {
        const businessId = req.query.business_id || req.body.business_id;

        if (!businessId) {
            return res.status(400).json({ 
                error: 'business_id é obrigatório' 
            });
        }

        const result = await pool.query(
            `SELECT 
                id,
                business_id,
                name,
                image,
                status,
                created_at,
                updated_at
             FROM categories
             WHERE business_id = $1
             ORDER BY created_at DESC`,
            [businessId]
        );

        const categories = result.rows.map(category => ({
            id: category.id,
            businessId: category.business_id,
            name: category.name,
            image: category.image,
            status: category.status,
            createdAt: category.created_at,
            updatedAt: category.updated_at
        }));

        res.status(200).json({
            categories: categories
        });

    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar categorias' 
        });
    }
};

// GET - Buscar categoria por ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.query.business_id || req.body.business_id;

        if (!id || !businessId) {
            return res.status(400).json({ 
                error: 'id e business_id são obrigatórios' 
            });
        }

        const result = await pool.query(
            `SELECT 
                id,
                business_id,
                name,
                image,
                status,
                created_at,
                updated_at
             FROM categories
             WHERE id = $1 AND business_id = $2`,
            [id, businessId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Categoria não encontrada' 
            });
        }

        const category = result.rows[0];
        res.status(200).json({
            category: {
                id: category.id,
                businessId: category.business_id,
                name: category.name,
                image: category.image,
                status: category.status,
                createdAt: category.created_at,
                updatedAt: category.updated_at
            }
        });

    } catch (error) {
        console.error('Error getting category:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar categoria' 
        });
    }
};

// PUT - Atualizar categoria
export const updateCategory = async (req, res) => {
    try {
        const { id, business_id, name, status } = req.body;
        let imageUrl = undefined;
        
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }

        if (!id || !business_id) {
            return res.status(400).json({ 
                error: 'id e business_id são obrigatórios' 
            });
        }

        // Buscar categoria atual para deletar imagem antiga se houver nova
        const currentCategory = await pool.query(
            'SELECT image FROM categories WHERE id = $1 AND business_id = $2',
            [id, business_id]
        );

        if (currentCategory.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Categoria não encontrada' 
            });
        }

        // Se há nova imagem, deletar a antiga do Cloudinary
        if (imageUrl && currentCategory.rows[0].image) {
            try {
                const publicId = currentCategory.rows[0].image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`categories/${publicId}`);
            } catch (error) {
                console.error('Error deleting old image:', error);
            }
        }

        // Construir query de atualização
        const updates = [];
        const values = [];
        let paramCount = 1;

        if (name !== undefined) {
            updates.push(`name = $${paramCount++}`);
            values.push(name);
        }

        if (imageUrl !== undefined) {
            updates.push(`image = $${paramCount++}`);
            values.push(imageUrl);
        }

        if (status !== undefined) {
            updates.push(`status = $${paramCount++}`);
            values.push(status);
        }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id, business_id);

        const result = await pool.query(
            `UPDATE categories
             SET ${updates.join(', ')}
             WHERE id = $${paramCount} AND business_id = $${paramCount + 1}
             RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Categoria não encontrada para atualização' 
            });
        }

        const category = result.rows[0];
        res.status(200).json({
            message: 'Categoria atualizada com sucesso',
            category: {
                id: category.id,
                businessId: category.business_id,
                name: category.name,
                image: category.image,
                status: category.status,
                createdAt: category.created_at,
                updatedAt: category.updated_at
            }
        });

    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ 
            error: 'Erro ao atualizar categoria' 
        });
    }
};

// DELETE - Deletar categoria
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.query.business_id || req.body.business_id;

        if (!id || !businessId) {
            return res.status(400).json({ 
                error: 'id e business_id são obrigatórios' 
            });
        }

        // Buscar categoria para deletar imagem do Cloudinary
        const category = await pool.query(
            'SELECT image FROM categories WHERE id = $1 AND business_id = $2',
            [id, businessId]
        );

        if (category.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Categoria não encontrada' 
            });
        }

        // Deletar imagem do Cloudinary se existir
        if (category.rows[0].image) {
            try {
                const publicId = category.rows[0].image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`categories/${publicId}`);
            } catch (error) {
                console.error('Error deleting image from Cloudinary:', error);
            }
        }

        // Deletar categoria do banco
        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 AND business_id = $2 RETURNING *',
            [id, businessId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Categoria não encontrada' 
            });
        }

        res.status(200).json({
            message: 'Categoria deletada com sucesso'
        });

    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ 
            error: 'Erro ao deletar categoria' 
        });
    }
};

