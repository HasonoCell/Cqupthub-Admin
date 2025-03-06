import service from "../utils/http";

export const addPositionService = (data) => {
    return service.post("/position/append", data)
}

export const getPositionService = () => {
    return service.get("/position/acquire")
}

export const editPositionService = (id, data) => {
    return service.put(`/position/edit/${id}`, data)
}

export const deletePositionService = (id) => {
    return service.delete(`/position/delete/${id}`)
}