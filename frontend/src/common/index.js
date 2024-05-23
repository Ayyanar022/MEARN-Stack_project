const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signup: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logOut: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
};

export default SummaryApi;
