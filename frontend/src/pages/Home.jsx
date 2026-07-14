import { useState } from "react";

import Hero from "../components/Hero";
import ItemsGrid from "../components/ItemsGrid";


function Home() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    return (
        <div>

            <Hero
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                type={type}
                setType={setType}
                sort={sort}
                setSort={setSort}
            />

            <ItemsGrid
                search={search}
                category={category}
                type={type}
                sort={sort}
                page={page}
                setPage={setPage}
            />

        </div>
    );
}

export default Home;