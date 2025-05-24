import imgDefault from "../../assets/default-course.svg";

export default function ClassCard({ classItem }) {
  return (
    <div className="class-card">
      <div className="class-card-header">
        <h3 className="class-card-title">{classItem.title}</h3>
        <div className="img-container">
          <img
            src={classItem.photo || imgDefault}
            alt={classItem.name}
            className="class-image"
          />
        </div>
      </div>
      <div className="class-card-body">
        <p className="class-card-description">{classItem.description}</p>
        <button className="btn btn-primary">
          See Video!!
        </button>
      </div>
    </div>
  );
}
