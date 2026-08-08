function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                    <h6 className="text-muted">{title}</h6>
                    <h2 className="fw-bold">{value}</h2>
                </div>
                <div className="fs-1 text-primary">
                    <Icon />
                </div>
            </div>
        </div>
    );
}

export default StatCard;