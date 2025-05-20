export const API_DOMAIN = process.env.REACT_APP_PATH_API;

export const auth = async (path, token) => {
  console.log(path)
  const res = await fetch(API_DOMAIN + path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const get = async (path) => {
  const res = await fetch(API_DOMAIN + path);
  const data = await res.json();
  return data;
};

export const authPost = async (path, token) => {
  const res = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });
  const data = await res.json();
  return data;
};

export const post = async (path, formData, token = null) => {
  const headerParam = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (token) {
    headerParam.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: headerParam,
    body: formData,
  });
  const result = await response.json();
  return result;
};

export const postJson = async (path, data, token = null) => {
    const headerParam = {
      accept: "application/json",
      "Content-Type": "application/json", // CHUYỂN sang application/json
    };
  
    if (token) {
      headerParam.Authorization = `Bearer ${token}`;
    }
  
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: headerParam,
      body: JSON.stringify(data), // stringify object JSON
    });
  
    const result = await response.json();
    return result;
  };
  

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export const patch = async (path, options, token) => {
  const headerParam = {
    accept: "application/json",
    "content-type": "application/json",
  };
  if (token) {
    headerParam.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: headerParam,
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const postFile = async (path, formData, token) => {
  const headerParam = {};
  if (token) {
    headerParam.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: headerParam,
    body: formData,
  });
  const result = await response.json();
  return result;
};
