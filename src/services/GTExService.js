let instance = null;

class GTExService {

  constructor() {
    if(instance !== null) {
      return instance;
    }

    instance = this;
  }

  buildUrl = (dbSNPId) => {
    let url = "https://www.gtexportal.org/home/eqtls/bySnp?snpId=" + dbSNPId + "&tissueName=All";
    return url;
  }

}

export default GTExService;
