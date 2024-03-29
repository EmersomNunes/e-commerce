"use client"
import { Product } from "@/types/Product";
import { products } from "@/utils/products";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const InputSearch = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLLIElement>(null);
    const maxResults = 3;

    const handleInputChange = (e: any) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term === '') {
            setSearchResults([]);
            return;
        }

        const results = products.filter(product =>
            product.name.toLowerCase().startsWith(term.toLowerCase())
        );

        setSearchResults(results.slice(0, maxResults));
    };

    const handleProductClick = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    
  const handleClickOutside = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

    return (
        <div className="w-full absolute z-10">
            <div className="relative flex flex-col mt-14 md:mt-20 items-center justify-center lg:mt-1 w-full lg:w-5/12">
                <input
                    type="text"
                    title="Pesquisar"
                    className="
                    h-8 
                    w-11/12 
                    placeholder:text-sm 
                    p-4 
                    outline-none
                    shadow-sm
                    shadow-gray-800
                    lg:placeholder:text-base
                    lg:w-6/6
                    xl:ml-[31rem] 
                    xl:w-full 
                    xl:h-10"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Pesquisar..."
                />
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map(product => (
                            <li ref={inputRef}
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                                className="
                                    flex
                                    bg-white
                                    shadow-sm
                                    shadow-gray-600
                                    px-3
                                    pt-3
                                    w-[22.6rem]
                                    lg:w-[555px]
                                    lg:ml-[25.9rem]
                                    p-2"
                            >
                                <Link
                                    href={`/products/${product.id}`}
                                    className="flex gap-2 bg-white rouded-lg px-1 hover:opacity-80 p-1"
                                >
                                    <img src={product.image} className="w-12 h-12 object-contain" />
                                    {product.name.split(' ').slice(0, 4).join(' ').toLowerCase()}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
