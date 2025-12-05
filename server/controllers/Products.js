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
            folder: 'products',
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

// POST - Criar produto
export const createProduct = async (req, res) => {
    try {
        const { business_id, category_id, name, purchase_price, sale_price, stock, preparation_time, status } = req.body;
        let imageUrl = null;
        
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }

        if (!business_id || !category_id || !name) {
            return res.status(400).json({ 
                error: 'business_id, category_id e name são obrigatórios' 
            });
        }

        const result = await pool.query(
            `INSERT INTO products (
                business_id,
                category_id,
                name,
                image,
                purchase_price,
                sale_price,
                stock,
                preparation_time,
                status,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *`,
            [
                business_id,
                category_id,
                name,
                imageUrl,
                purchase_price || null,
                sale_price || null,
                stock || 0,
                preparation_time || null,
                status || 'active'
            ]
        );

        const product = result.rows[0];
        res.status(201).json({
            message: 'Produto criado com sucesso',
            product: {
                id: product.id,
                businessId: product.business_id,
                categoryId: product.category_id,
                name: product.name,
                image: product.image,
                purchasePrice: product.purchase_price,
                salePrice: product.sale_price,
                stock: product.stock,
                preparationTime: product.preparation_time,
                status: product.status,
                createdAt: product.created_at,
                updatedAt: product.updated_at
            }
        });

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ 
            error: 'Erro ao criar produto' 
        });
    }
};

// GET - Listar produtos
export const getProducts = async (req, res) => {
    try {
        const businessId = req.query.business_id || req.body.business_id;

        if (!businessId) {
            return res.status(400).json({ 
                error: 'business_id é obrigatório' 
            });
        }

        const result = await pool.query(
            `SELECT 
                p.id,
                p.business_id,
                p.category_id,
                p.name,
                p.image,
                p.purchase_price,
                p.sale_price,
                p.stock,
                p.preparation_time,
                p.status,
                p.created_at,
                p.updated_at,
                c.name as category_name
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.business_id = $1
             ORDER BY p.created_at DESC`,
            [businessId]
        );

        const products = result.rows.map(product => ({
            id: product.id,
            businessId: product.business_id,
            categoryId: product.category_id,
            categoryName: product.category_name,
            name: product.name,
            image: product.image,
            purchasePrice: product.purchase_price,
            salePrice: product.sale_price,
            stock: product.stock,
            preparationTime: product.preparation_time,
            status: product.status,
            createdAt: product.created_at,
            updatedAt: product.updated_at
        }));

        res.status(200).json({
            products: products
        });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar produtos' 
        });
    }
};

// GET - Buscar produto por ID
export const getProductById = async (req, res) => {
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
                p.id,
                p.business_id,
                p.category_id,
                p.name,
                p.image,
                p.purchase_price,
                p.sale_price,
                p.stock,
                p.preparation_time,
                p.status,
                p.created_at,
                p.updated_at,
                c.name as category_name
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.id = $1 AND p.business_id = $2`,
            [id, businessId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Produto não encontrado' 
            });
        }

        const product = result.rows[0];
        res.status(200).json({
            product: {
                id: product.id,
                businessId: product.business_id,
                categoryId: product.category_id,
                categoryName: product.category_name,
                name: product.name,
                image: product.image,
                purchasePrice: product.purchase_price,
                salePrice: product.sale_price,
                stock: product.stock,
                preparationTime: product.preparation_time,
                status: product.status,
                createdAt: product.created_at,
                updatedAt: product.updated_at
            }
        });

    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar produto' 
        });
    }
};

// PUT - Atualizar produto
export const updateProduct = async (req, res) => {
    try {
        const { id, business_id, category_id, name, purchase_price, sale_price, stock, preparation_time, status } = req.body;
        let imageUrl = undefined;
        
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }

        if (!id || !business_id) {
            return res.status(400).json({ 
                error: 'id e business_id são obrigatórios' 
            });
        }

        // Buscar produto atual para deletar imagem antiga se houver nova
        const currentProduct = await pool.query(
            'SELECT image FROM products WHERE id = $1 AND business_id = $2',
            [id, business_id]
        );

        if (currentProduct.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Produto não encontrado' 
            });
        }

        // Se há nova imagem, deletar a antiga do Cloudinary
        if (imageUrl && currentProduct.rows[0].image) {
            try {
                const publicId = currentProduct.rows[0].image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${publicId}`);
            } catch (error) {
                console.error('Error deleting old image:', error);
            }
        }

        // Construir query de atualização
        const updates = [];
        const values = [];
        let paramCount = 1;

        if (category_id !== undefined) {
            updates.push(`category_id = $${paramCount++}`);
            values.push(category_id);
        }

        if (name !== undefined) {
            updates.push(`name = $${paramCount++}`);
            values.push(name);
        }

        if (imageUrl !== undefined) {
            updates.push(`image = $${paramCount++}`);
            values.push(imageUrl);
        }

        if (purchase_price !== undefined) {
            updates.push(`purchase_price = $${paramCount++}`);
            values.push(purchase_price);
        }

        if (sale_price !== undefined) {
            updates.push(`sale_price = $${paramCount++}`);
            values.push(sale_price);
        }

        if (stock !== undefined) {
            updates.push(`stock = $${paramCount++}`);
            values.push(stock);
        }

        if (preparation_time !== undefined) {
            updates.push(`preparation_time = $${paramCount++}`);
            values.push(preparation_time);
        }

        if (status !== undefined) {
            updates.push(`status = $${paramCount++}`);
            values.push(status);
        }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id, business_id);

        const result = await pool.query(
            `UPDATE products
             SET ${updates.join(', ')}
             WHERE id = $${paramCount} AND business_id = $${paramCount + 1}
             RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Produto não encontrado para atualização' 
            });
        }

        const product = result.rows[0];
        res.status(200).json({
            message: 'Produto atualizado com sucesso',
            product: {
                id: product.id,
                businessId: product.business_id,
                categoryId: product.category_id,
                name: product.name,
                image: product.image,
                purchasePrice: product.purchase_price,
                salePrice: product.sale_price,
                stock: product.stock,
                preparationTime: product.preparation_time,
                status: product.status,
                createdAt: product.created_at,
                updatedAt: product.updated_at
            }
        });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            error: 'Erro ao atualizar produto' 
        });
    }
};

// DELETE - Deletar produto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.query.business_id || req.body.business_id;

        if (!id || !businessId) {
            return res.status(400).json({ 
                error: 'id e business_id são obrigatórios' 
            });
        }

        // Buscar produto para deletar imagem do Cloudinary
        const product = await pool.query(
            'SELECT image FROM products WHERE id = $1 AND business_id = $2',
            [id, businessId]
        );

        if (product.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Produto não encontrado' 
            });
        }

        // Deletar imagem do Cloudinary se existir
        if (product.rows[0].image) {
            try {
                const publicId = product.rows[0].image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${publicId}`);
            } catch (error) {
                console.error('Error deleting image from Cloudinary:', error);
            }
        }

        // Deletar produto do banco
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 AND business_id = $2 RETURNING *',
            [id, businessId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Produto não encontrado' 
            });
        }

        res.status(200).json({
            message: 'Produto deletado com sucesso'
        });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            error: 'Erro ao deletar produto' 
        });
    }
};

