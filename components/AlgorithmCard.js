import { Link } from "react-router-dom"

const AlgorithmCard = ({ title, description, category, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-600 font-medium">{category}</span>
        <Link
          to={link}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Visualize
        </Link>
      </div>
    </div>
  )
}

export default AlgorithmCard
