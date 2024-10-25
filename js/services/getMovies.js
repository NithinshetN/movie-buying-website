var url = "http://localhost:3000"
export const fetchMoviesData=async(val)=>{
    let valueData;
    if (!val) {
        valueData = ""
    } else {
        valueData = val
    }
    const url1 = await fetch(`${url}/getmovies/${valueData}`);
    const js = await url1.json();

    return js;
}

