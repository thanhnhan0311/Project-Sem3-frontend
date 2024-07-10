import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";

const onCreateEmployee = async (payload) => {
  const response = await axiosAdmin.post("user/create-employee", payload);
  return response.data;
};

export const CreateEmployeeRequest = () => {
  const mutation = useMutation({
    mutationFn: onCreateEmployee,
  });

  return mutation;
};

const onGetEmployee = async (pageNumber, pageSize = 20) => {
  const response = await axiosAdmin.get("user/get-employee", {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
  });
  return response.data;
};

export const GetEmployeeRequest = (pageNumber, pageSize) => {
  const query = useQuery({
    queryKey: ["employees", pageNumber, pageSize],
    queryFn: () => {
      return onGetEmployee(pageNumber, pageSize);
    },
    retry: 0,
  });

  return query;
};

const activateEmployee = async (payload) => {
  const response = await axiosAdmin.post("user/activate-employee", payload);
  return response.data;
};

export const ActivateEmployeeRequest = () => {
  return useMutation({
    mutationFn: activateEmployee,
  });
};

const deactivateEmployee = async (payload) => {
  const response = await axiosAdmin.post("user/deactivate-employee", payload);
  return response.data;
};

export const DeActivateEmployeeRequest = () => {
  return useMutation({
    mutationFn: deactivateEmployee,
  });
};

const updateEmployee = async (payload) => {
  const response = await axiosAdmin.put("user/update-employee", payload);
  return response.data;
};

export const UpdateEmployeeRequest = () => {
  return useMutation({
    mutationFn: updateEmployee,
  });
};
