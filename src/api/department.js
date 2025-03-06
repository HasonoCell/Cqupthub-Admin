import service from "../utils/http";

// 注意是大写的 ID 不是小写的 id ！！！
export const addDepartmentService = (data) => {
    return service.post('/department/append', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const editDepartmentService = (ID, data) => {
    return service.put(`/department/edit/${ID}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteDepartmentService = (ID) => {
    return service.delete(`/department/delete/${ID}`)
}

export const getDepartmentService = () => {
    return service.get('/department/acquire')
}