const About = () => {
    return (
        <div className="px-4 py-8 bg-gray-800 w-full mt-40">
            <h1 className="text-center text-white text-5xl font-bold mt-20">Trusted by Job Seekers Worldwide</h1>
            <p className="text-center text-[#e7ebf2] text-lg mt-4">Our platform has helped thousands of professionals find their ideal career <br /> opportunities.</p>
            <div className="text-center mt-8 flex justify-around">
                <div>
                    <span className="text-4xl font-bold text-white inline-block hover:scale-125 transition-transform duration-300">500+</span>
                    <p className="text-[#e7ebf2] text-lg mt-2">Active Job listings</p>
                </div>
                <div>
                    <span className="text-4xl font-bold text-white inline-block hover:scale-125 transition-transform duration-300">200+</span>
                    <p className="text-[#e7ebf2] text-lg mt-2">Top companies</p>
                </div>
                <div>
                    <span className="text-4xl font-bold text-white inline-block hover:scale-125 transition-transform duration-300">50K+</span>
                    <p className="text-[#e7ebf2] text-lg mt-2">Successful Placements</p>
                </div>
                <div>
                    <span className="text-4xl font-bold text-white inline-block hover:scale-125 transition-transform duration-300">98%</span>
                    <p className="text-[#e7ebf2] text-lg mt-2">User Satisfaction</p>
                </div>
            </div>

        </div>
    )
}

export default About