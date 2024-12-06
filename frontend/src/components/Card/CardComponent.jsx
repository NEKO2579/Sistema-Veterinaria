const CardComponent = ({ title, imageSrc, items, panelClass }) => {
    return (
        <div className={`panel ${panelClass} fixed-card`}>
            <div className="panel-heading" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</div>
            <div className="panel-body d-flex justify-content-center align-items-center">
                <img
                    src={imageSrc}
                    className="img-responsive"
                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} // Aumenta maxHeight y cambia width a 100%
                    alt="Card image"
                />
            </div>
            <div className="panel-footer">
                <ul style={{ fontSize: '1.2rem' }}>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CardComponent;


