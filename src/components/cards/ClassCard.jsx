import imgDefault from "../../assets/default-course.svg";
import { Link } from "react-router-dom";
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
        <div className="class-separator"></div>
        <div
          className="class-content"
          dangerouslySetInnerHTML={{
            __html: classItem.content || "No content available for this class.",
          }}
        ></div>
        <Link
          to={"/courses/" + classItem.course_id + "/classes/" + classItem.id}
        >
          <button className="btn btn-primary">See Video!!</button>
        </Link>
      </div>
    </div>
  );
}
