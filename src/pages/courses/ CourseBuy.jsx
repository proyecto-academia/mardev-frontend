export default function CourseBuy() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Course Purchase</h1>
      <p className="text-lg mb-6">To access this course, please purchase it.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Buy Course
      </button>
    </div>
  );
}