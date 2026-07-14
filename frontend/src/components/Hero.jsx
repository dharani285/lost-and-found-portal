import { useNavigate } from "react-router-dom";

function Hero({
    search,
    setSearch,
    category,
    setCategory,
    type,
    setType,
    sort,
    setSort,
}) {

    const navigate = useNavigate();

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">

            <br />

            <h1 className="Poppins text-5xl font-bold text-gray-800">
                Lost Something?
            </h1>

            <br />

            <p className="text-gray-600 mt-4 text-lg">
                Search for your lost belongings or help others find theirs.
            </p>

            <br />

            {/* Filters */}
            <div className="flex justify-center gap-6 flex-wrap">

                {/* Category */}
                <div className="flex flex-col items-center">
                    <label className="mb-2 font-semibold text-gray-700">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-72 h-12 rounded-xl border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">All Categories</option>
                        <option value="accessories">Accessories</option>
                        <option value="electronics">Electronics</option>
                        <option value="documents">Documents</option>
                        <option value="clothing">Clothing</option>
                        <option value="pets">Pets</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                {/* Type */}
                <div className="flex flex-col items-center">
                    <label className="mb-2 font-semibold text-gray-700">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-72 h-12 rounded-xl border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">All Types</option>
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                {/* Sort */}
                <div className="flex flex-col items-center">
                    <label className="mb-2 font-semibold text-gray-700">
                        Sort
                    </label>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-72 h-12 rounded-xl border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="location">Location (A-Z)</option>
                    </select>
                </div>

            </div>

            <br />

            {/* Search Box */}
            <div className="mt-8 flex justify-center">

                <input
                    type="text"
                    placeholder="Search by item name, category or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-2xl h-14 px-6 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

            </div>

            <br />

            {/* Buttons */}
            <div className="mt-10 flex justify-center gap-6">

                <button
                    onClick={() => navigate("/report-lost")}
                    className="w-[250px] h-[60px] text-[22px] bg-red-400 hover:bg-red-600 text-white rounded-xl font-semibold transition"
                >
                    Report Lost
                </button>

                <button
                    onClick={() => navigate("/report-found")}
                    className="w-[250px] h-[60px] text-[22px] bg-green-400 hover:bg-green-700 text-white rounded-xl font-semibold transition"
                >
                    Report Found
                </button>

            </div>

        </section>
    );
}

export default Hero;