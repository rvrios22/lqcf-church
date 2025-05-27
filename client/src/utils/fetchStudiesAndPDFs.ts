import customFetch from "./customFetch"

const fetchStudiesAndPDFs = async<T1, T2>(study: string, pdfs: string): Promise<[T1, T2] | undefined> => {
    try {
        const [studyRes, pdfsRes] = await Promise.all([customFetch<T1>(study), customFetch<T2>(pdfs)])
        return [studyRes, pdfsRes]
    } catch (e) {
        console.error(e)
        return undefined
    }
}
export default fetchStudiesAndPDFs