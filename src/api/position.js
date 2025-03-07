import service from "../utils/http";

export const addPositionService = (data) => {
    return service.post("/position/append", data)
}

export const getPositionService = () => {
    return service.get("/position/acquire")
}

export const editPositionService = (ID, data) => {
    return service.put(`/position/edit/${ID}`, data)
}

export const deletePositionService = (ID) => {
    return service.delete(`/position/delete/${ID}`)
}