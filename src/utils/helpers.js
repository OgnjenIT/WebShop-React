export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number/100)
    return newNumber;
}

export const getUniqueValues = (products, type) => {
    let filterType = products.map(product=>{
        return product[type]
    })

    if(type === "colors"){
        filterType = filterType.flat()
    }
    


    return ["all" ,...new Set(filterType)]
}
