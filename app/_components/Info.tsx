const Info = () => {
    return (
        <div>
            <h2 className="text-5xl font-bold text-center mt-10">Why Choose JobSearch?</h2>
            <p className="text-lg text-center mt-8">We've designed the most intuitive job search platform to help you find opportunities <br /> that align with your career goals.</p>
            <div className="mt-24 grid grid-cols-2 grid-rows-2 gap-6 max-w-5xl mx-auto">
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md hover:bg-gray-200 hover:border-gray-300">
                    <p className="text-4xl mb-4">🔍</p>

                    <h3 className="text-xl font-semibold mb-3">Powerful Search</h3>
                    <p className="text-gray-600">Advanced filtering by job title, category, and more. Find exactly what you&aposre looking for in seconds.</p>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md hover:bg-gray-200 hover:border-gray-300">
                    <p className="text-4xl mb-4">⭐</p>
                    <h3 className="text-xl font-semibold mb-3">Curated Opportunities</h3>
                    <p className="text-gray-600">Carefully selected job postings from verified companies across industries and experience levels.</p>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md hover:bg-gray-200 hover:border-gray-300">
                    <p className="text-4xl mb-4">✨</p>
                    <h3 className="text-xl font-semibold mb-3">User-Friendly Interface</h3>
                    <p className="text-gray-600">Intuitive design makes job hunting simple and enjoyable. Browse, filter, and explore with ease.</p>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md hover:bg-gray-200 hover:border-gray-300">
                    <p className="text-4xl mb-4">⚡</p>
                    <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
                    <p className="text-gray-600">Instant notifications for new job postings. Never miss an opportunity that matches your profile.</p>
                </div>
            </div>
        </div>
    )
}

export default Info