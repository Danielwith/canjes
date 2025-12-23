import React from "react";
import { Eye } from 'lucide-react';

export default function ProductCard({ product, onAdd, onView }) {
    if (!product) return null;

    return (
        <div className="border border-gray-200 rounded-lg p-3 flex flex-col gap-2 bg-white text-gray-900">
            <div className="h-40 flex items-center justify-center">
                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="text-sm font-semibold">{product.title}</div>
            <div className="text-sm text-gray-500">{product.category}</div>
            <div className="text-lg font-bold">{`$${product.price}`}</div>
            <div className="flex  flex-col gap-2 mt-2">
                <button className="flex-1 py-2 rounded-md text-white bg-black" onClick={() => onAdd?.(product)}>Agregar</button>
                <button onClick={() => onView?.(product)} className="text-sm w-full flex justify-center items-center cursor-pointer" >
                    <Eye />
                </button>
            </div>
        </div>
    );
}
