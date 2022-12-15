import axios from 'axios';

const config = {
  headers: {
    Authorization: 'Bearer ' + window.localStorage.getItem('jwt'),
  },
  headers: {
    Authorization: 'Bearer ' + window.localStorage.getItem('jwt'),
  },
};

var lang: string[][] = [];

export const code = (name: string) => {
  var skillID;
  var skillName;
  var skillLevel;
  var monthsOfExperience;
  if (window.innerWidth > 480) {
    var element = document.getElementById(name);
    var boxElement = document.getElementById('codeBox');
    var textElement1 = document.getElementById('skillText1');
    var textElement2 = document.getElementById('skillText2');
    var elementskillLVL = document.getElementById('skillMonths');
    var boxElementFill = document.getElementById('codeBoxFill');

    lang.forEach((element: any) => {
      if (name === element[1]) {
        skillID = element[0];
        skillName = element[1];
        skillLevel = element[2];
        monthsOfExperience = element[3];
      }
    });
    if (element!.title === 'setSwag' && boxElement!.title === 'setSwag') {
      element!.style.fontSize = '1.8rem';
      element!.style.marginTop = '20%';
      element!.style.marginLeft = '30%';
      element!.style.transition = '0s';
      boxElement!.style.opacity = '0';
      boxElement!.style.width = '0%';
      boxElement!.style.transition = '0.5s';
      textElement1!.style.opacity = '1';
      textElement2!.style.opacity = '0';
      elementskillLVL!.style.opacity = '0';
      boxElementFill!.style.width = '0%';
      boxElementFill!.style.transition = '0.5s';
      element!.title = '';
      boxElement!.title = '';
    } else if (element!.title === '' && boxElement!.title === '') {
      console.log('Showing skills');
      element!.style.transition = '2s';
      element!.style.fontSize = '8rem';
      element!.style.position = 'absolute';
      element!.style.marginTop = '15%';
      element!.style.marginLeft =
        window.innerWidth * 0.45 -
        (element?.offsetWidth !== undefined ? element?.offsetWidth : 0) *
          4.444 +
        'px';
      boxElement!.style.transition = '1s';
      boxElement!.style.opacity = '1';
      boxElement!.style.width = '30%';
      textElement1!.style.opacity = '0';
      textElement2!.style.opacity = '1';
      elementskillLVL!.innerHTML =
        'Months of experience: ' + monthsOfExperience;
      elementskillLVL!.style.opacity = '1';

      boxElementFill!.style.transition = '1s';
      boxElementFill!.style.transitionDelay = '0.8s';
      boxElementFill!.style.width = skillLevel + '%';
      element!.title = 'setSwag';
      boxElement!.title = 'setSwag';
    }
  } else if (window.innerWidth < 480) {
    var element = document.getElementById(name);
    var boxElement = document.getElementById('codeBox');
    var textElement1 = document.getElementById('skillText1');
    var textElement2 = document.getElementById('skillText2');
    var elementskillLVL = document.getElementById('skillLVL');
    var boxElementFill = document.getElementById('codeBoxFill');

    lang.forEach((element: any) => {
      if (name === element[1]) {
        skillID = element[0];
        skillName = element[1];
        skillLevel = element[2];
        monthsOfExperience = element[3];
      }
    });

    if (element!.title === 'setSwag' && boxElement!.title === 'setSwag') {
      element!.style.fontSize = '1.2rem';
      element!.style.marginTop = '60%';
      element!.style.marginLeft = '40%';
      element!.style.transition = '0s';
      boxElement!.style.opacity = '0';
      boxElement!.style.width = '0%';
      boxElement!.style.transition = '0.5s';
      textElement1!.style.opacity = '1';
      textElement2!.style.opacity = '0';
      elementskillLVL!.style.opacity = '0';
      boxElementFill!.style.width = '0%';
      boxElementFill!.style.transition = '0.5s';
      element!.title = '';
      boxElement!.title = '';
    } else if (element!.title === '' && boxElement!.title === '') {
      console.log('Showing skills');
      element!.style.transition = '2s';
      element!.style.fontSize = '4rem';
      element!.style.position = 'absolute';
      element!.style.marginLeft = '25%';
      element!.style.marginTop = '60%';
      boxElement!.style.transition = '1s';
      boxElement!.style.opacity = '1';
      boxElement!.style.width = '70%';
      textElement1!.style.opacity = '0';
      textElement2!.style.opacity = '1';
      elementskillLVL!.style.opacity = '1';
      elementskillLVL!.style.content =
        'Months of experience:' + { monthsOfExperience };
      boxElementFill!.style.transition = '1s';
      boxElementFill!.style.transitionDelay = '0.8s';
      boxElementFill!.style.width = skillLevel + '%';
      element!.title = 'setSwag';
      boxElement!.title = 'setSwag';
    }
  }
};

const axiosInstance = axios.create({
  baseURL: 'https://prj4appservice.azurewebsites.net/api/',
  baseURL: 'https://prj4appservice.azurewebsites.net/api/',
});
export function getSkills(pos: number[][]) {
  axiosInstance
    .get('Skills')
    .then((response) => {
      response.data.forEach((elem: any) => {
        var p = document.createElement('p');
        p.className = 'scribble';
        p.id = elem.skillName;
        p.innerHTML = elem.skillName;
        p.style.marginLeft =
          pos[elem.skillID - 1][0] * window.innerWidth + 'px';
        p.style.marginTop =
          pos[elem.skillID - 1][1] * window.innerHeight + 'px';
        p.style.position = 'absolute';
        p.onclick = () => {
          code(elem.skillName);
        };
        document.getElementById('langs')?.appendChild(p);
        lang.push([
          elem.skillID,
          elem.skillName,
          elem.skillLevel,
          elem.monthsOfExperience,
        ]);
      });
    })
    .catch(console.error);
  axiosInstance
    .get('Skills')
    .then((response) => {
      response.data.forEach((elem: any) => {
        var p = document.createElement('p');
        p.className = 'scribble';
        p.id = elem.skillName;
        p.innerHTML = elem.skillName;
        p.style.marginLeft =
          pos[elem.skillID - 1][0] * window.innerWidth + 'px';
        p.style.marginTop =
          pos[elem.skillID - 1][1] * window.innerHeight + 'px';
        p.style.position = 'absolute';
        p.onclick = () => {
          code(elem.skillName);
        };
        document.getElementById('langs')?.appendChild(p);
        lang.push([
          elem.skillID,
          elem.skillName,
          elem.skillLevel,
          elem.monthsOfExperience,
        ]);
      });
    })
    .catch(console.error);

  return lang;
  return lang;
}

export function getDescription() {
  return axiosInstance
    .get('Texts')
    .then((response) => {
      return response.data[0];
    })
    .catch(console.error);
  return axiosInstance
    .get('Texts')
    .then((response) => {
      return response.data[0];
    })
    .catch(console.error);
}

export function putSkill(skill: any) {
  return axiosInstance
    .put('Skills/' + skill.skillID, skill, config)
    .then((response) => {
      return response;
    })
    .catch(console.error);
  return axiosInstance
    .put('Skills/' + skill.skillID, skill, config)
    .then((response) => {
      return response;
    })
    .catch(console.error);
}

export function putDescription(desc: string) {
  return axiosInstance
    .put(
      'Texts/1',
      {
        textID: 1,
        headline: document.getElementById('aboutTitleText')!.innerHTML,
        mainText: desc,
      },
      config
    )
    .then((response) => {
      return response;
    })
    .catch(console.error);
  return axiosInstance
    .put(
      'Texts/1',
      {
        textID: 1,
        headline: document.getElementById('aboutTitleText')!.innerHTML,
        mainText: desc,
      },
      config
    )
    .then((response) => {
      return response;
    })
    .catch(console.error);
}

export function putTitle(title: string) {
  axiosInstance
    .put(
      'Texts/1',
      {
        textID: 1,
        headline: title,
        mainText: document.getElementById('t')!.innerHTML,
      },
      config
    )
    .then((response) => {
      return response;
    })
    .catch(console.error);
}

export function authorize() {
  return axiosInstance
    .put('/users/loggedin', config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function getFiles() {
  return axiosInstance
    .get('Files')
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(console.error);
}

export function getFilesSort(sort: string) {
  return axiosInstance
    .get('Files/FilesSort', {
      params: {
        sort: sort,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(console.error);
  return axiosInstance
    .get('Files/FilesSort', {
      params: {
        sort: sort,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(console.error);
}

export function getFilesFind(find: string) {
  return axiosInstance
    .get('Files/FilesFind', {
      params: {
        sort: find,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(console.error);
  return axiosInstance
    .get('Files/FilesFind', {
      params: {
        sort: find,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(console.error);
}

export function getBlob(id: string, Filetype: string, name: string) {
  axiosInstance({
    url: '/files/' + id, //your url
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);
    axiosInstance({
      url: '/files/' + id, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `${name}.${Filetype}`); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });
}

export function deleteSkill(id: number) {
  axiosInstance
    .delete('Skills/' + id, config)
    .then((resp) => {
      return resp;
    })
    .catch(console.error);
}

export function postSkill(skill: any) {
  axiosInstance
    .post('Skills', skill, config)
    .then((resp) => {
      return resp;
    })
    .catch(console.error);
}
/*
export function postProject(language: string, selectedFile: any) {
  const formData = new FormData();
  formData.append('selectedFile', selectedFile);
  axiosInstance
    .post('Files', { language, formData }, config)
    .then((resp) => {
      return resp;
    })
    .catch(console.error);
}*/

export async function postProject(selectedFile: any, language: string) {
  const formData = new FormData();
  formData.append('files', selectedFile);
  formData.append('language', language);
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  try {
    axiosInstance({
      method: 'post',
      url: 'https://prj4appservice.azurewebsites.net/api/Files/',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    });
  } catch (error) {
    console.log('ERROR!', error);
  }
}

export function postLogin(username: string, password: string) {
  return axiosInstance
    .post('Users/login', { Email: username, Password: password })
    .then((resp) => {
      return resp;
    })
    .catch(console.error);
  return axiosInstance
    .post('Users/login', { Email: username, Password: password })
    .then((resp) => {
      return resp;
    })
    .catch(console.error);
}
