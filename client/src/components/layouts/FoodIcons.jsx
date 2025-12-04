import hamburguerImg from '../../assets/hamburguer.png';
import batatasFritasImg from '../../assets/batatas-fritas.png';
import pizzaImg from '../../assets/pizza.png';

export default function FoodIcons() {
    // Reduced quantity, larger size, distributed in top, middle, bottom
    const topPositions = [
        { left: '15%', rotate: '15deg', img: hamburguerImg, alt: 'Hamburger' },
    ];

    const middlePositions = [
        { left: '75%', rotate: '-35deg', img: batatasFritasImg, alt: 'Batatas Fritas' },
    ];

    const bottomPositions = [
        { left: '50%', rotate: '45deg', img: pizzaImg, alt: 'Pizza' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top icons */}
            {topPositions.map((pos, index) => (
                <div 
                    key={`top-${index}`}
                    className="absolute top-20" 
                    style={{ 
                        left: pos.left, 
                        transform: `rotate(${pos.rotate})` 
                    }}
                >
                    <img 
                        src={pos.img} 
                        alt={pos.alt} 
                        className="w-40 h-40 opacity-20" 
                    />
                </div>
            ))}

            {/* Middle icons */}
            {middlePositions.map((pos, index) => (
                <div 
                    key={`middle-${index}`}
                    className="absolute top-1/2" 
                    style={{ 
                        left: pos.left, 
                        transform: `translateY(-50%) rotate(${pos.rotate})` 
                    }}
                >
                    <img 
                        src={pos.img} 
                        alt={pos.alt} 
                        className="w-40 h-40 opacity-20" 
                    />
                </div>
            ))}

            {/* Bottom icons */}
            {bottomPositions.map((pos, index) => (
                <div 
                    key={`bottom-${index}`}
                    className="absolute bottom-20" 
                    style={{ 
                        left: pos.left, 
                        transform: `rotate(${pos.rotate})` 
                    }}
                >
                    <img 
                        src={pos.img} 
                        alt={pos.alt} 
                        className="w-40 h-40 opacity-20" 
                    />
                </div>
            ))}
        </div>
    );
}
