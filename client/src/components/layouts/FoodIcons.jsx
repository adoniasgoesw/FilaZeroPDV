import hamburguerImg from '../../assets/hamburguer.png';
import batatasFritasImg from '../../assets/batatas-fritas.png';
import pizzaImg from '../../assets/pizza.png';
import queijoImg from '../../assets/queijo.png';

export default function FoodIcons() {
    // 8 icons well distributed across the screen
    const icons = [
        // Top row
        { left: '10%', top: '15%', rotate: '12deg', img: hamburguerImg, alt: 'Hamburger' },
        { left: '30%', top: '12%', rotate: '-18deg', img: pizzaImg, alt: 'Pizza' },
        { left: '70%', top: '18%', rotate: '25deg', img: batatasFritasImg, alt: 'Batatas Fritas' },
        { left: '90%', top: '14%', rotate: '-15deg', img: queijoImg, alt: 'Queijo' },
        
        // Bottom row
        { left: '8%', top: '85%', rotate: '-22deg', img: pizzaImg, alt: 'Pizza' },
        { left: '25%', top: '88%', rotate: '18deg', img: hamburguerImg, alt: 'Hamburger' },
        { left: '75%', top: '82%', rotate: '-28deg', img: queijoImg, alt: 'Queijo' },
        { left: '92%', top: '86%', rotate: '20deg', img: batatasFritasImg, alt: 'Batatas Fritas' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((icon, index) => (
                <div 
                    key={`icon-${index}`}
                    className="absolute" 
                    style={{ 
                        left: icon.left, 
                        top: icon.top,
                        transform: `rotate(${icon.rotate})` 
                    }}
                >
                    <img 
                        src={icon.img} 
                        alt={icon.alt} 
                        className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-10 md:opacity-15 object-contain" 
                        style={{ aspectRatio: '1/1' }}
                    />
                </div>
            ))}
        </div>
    );
}
