[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />
<p align="center">

  <h3 align="center">Engin Demiroğ Java-React Kampı Frontend</h3>

  <p align="center">
    Hoşgeldiniz. Bu Proje Java-React Kampı'nın Frontend Bölümünde Verilen Ödevlerin Uygulandığı Projedir. Eğer Beğenirseniz Bir Yıldızınızı Alırım. Şimdiden Teşekkürler.
  
</p>



<!-- TABLE OF CONTENTS -->
<summary><h2 style="display: inline-block">Dökümantasyon İçeriği</h2></summary>
<ol>
  <li>
    <a href="#katmanlar">Proje Katmanları</a>
    <ul>
      <li><a href="#genel-kullanıcı-katmanı">Main - Genel Kullanıcı</a></li>
      <li><a href="#admin-katmanı">Admin - Sistem Yöneticisi</a></li>
      <li><a href="#employer-katmanı">Employer - İş Veren</a></li>
      <li><a href="#employee-katmanı">Employee - İş Arayan/İşçi</a></li>
    </ul>
  </li>
  <li><a href="#kullanılan-başlıca-paketler">Kullanılan Başlıca Paketler</a></li>
  <li>
    <a href="#projenin-kurulumu-ve-çalıştırılması">Projenin Kurulumu/Çalıştırılması</a>
    <ul>
      <li><a href="#proje-kurulumu">Proje Kurulumu</a></li>
      <li><a href="#projenin-çalıştırılması">Projenin Çalıştırılması</a></li>
    </ul>
  </li>
  <li><a href="#proje-haritası">Proje Haritası</a></li>
  <li><a href="#iletişim">İletişim</a></li>
  <li> <a href="#kapanış">Kapanış Ve Teşekkür</a></li>
</ol>



## Katmanlar

### Genel Kullanıcı Katmanı
<ul>
  <li>Bu Katman İçin Herhangi Bir Authentication İşlemi Gerekmemektedir.</li>
  <li>Projenin Başlangıç Sayfası Bu Katmandadır. (/main/welcome)</li>
  <li>Bu Katmanın Layout'u Main Layout'tur. ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/layouts/Main.js">Main Layout</a></li>
  <li>
    Bu Katman İçin Kullanılabilecek Adresler Şunlardır:
    <ul>
      <li>main/welcome ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Welcome.js">Welcome Sayfası</a></li>
      <li>main/postings ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/JobPostingList.js">İş İlanları Sayfası</a></li>
      <li>main/login ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Login.js">Giriş Sayfası</a></li>
      <li>main/register ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Register/Register.js">Kayıt Başlangıç Sayfası</a></li>
      <li>main/employee/register ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Register/EmployeeRegister.js">İş Arayan Kayıt Tamamlama Sayfası</a></li>
      <li>main/employer/register ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Register/EmployerRegister.js">İş Veren Kayıt Tamamlama Sayfası</a></li>
    </ul>
  </li>
  <li>
    Bu Katmanda Kullanılan Componentlar Şunlardır:
    <ul>
      <li>MainNavbar ==> <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/components/Navbars/MainNavbar.js">Navbar</a></li>
    </ul>
  </li>
  <li>
    Bu Katmanda Kullanılan Viewler Şunlardır: 
    <ul>
      <li>Hoşgeldiniz => <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Welcome.js">Welcome</a></li>
      <li>Hoşgeldiniz Devam => <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/WelcomeChild.js">Welcome Child</a></li>
      <li>Giriş => <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Login.js">Login</a></li>
      <li>İş İlanları Listesi => <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/JobPostingList.js">JobPostingList</a></li>
      <li>Kayıt Başlangıç =><a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Register/Register.js">Register</a></li>
      <li>İş Veren Kayıt Devam => <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Register/EmployerRegister.js">Employer Register</a></li>
      <li>İş Arayan Kayıt Devam => <a href="https://github.com/fmutlu68/hrmsSystemUI/blob/master/src/views/Main/Register/EmployeeRegister.js">Employee Register</a></li>
    </ul>
  </li>
  <li>Bu Katmana Ait Resimler => <a href="#genel-kullanıcı-katmanı-resimler">Genel Kullanıcı Katmanı Resimler</a></li>
</ul>


### Admin Katmanı
Deneme


### Employer Katmanı


### Employee Katmanı

## Proje Haritası


## Kullanılan Başlıca Paketler

* [Bootstrap](https://getbootstrap.com)
* [Semantic-Ui-React](https://react.semantic-ui.com/)
* [Material-Ui](https://material-ui.com/)
* [Redux](https://redux.js.org/)
* [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* [Axios](https://github.com/axios/axios)
* [Formik](https://formik.org/)
* [Reactstrap](https://reactstrap.github.io/)
* [Perfect Scrollbar](https://github.com/mdbootstrap/perfect-scrollbar)



## Projenin Kurulumu Ve Çalıştırılması

### Proje Kurulumu
Projeyi İndirip Bir Klasöre Çıkartıyoruz. Ardından Bir Terminal Açıyoruz Ve 
* ```
  npm install
  ```
 Komutunu Çalıştırıyoruz. Böylece Paketleri Projemize Ekliyoruz. Paketlerin Yüklenmesi Biraz Uzun Sürebilir.

### Projenin Çalıştırılması
Paketleri Yükledikten Sonra 
* ```
  npm start
  ```
Komutu İle Projemizi Çalıştırıyoruz.



## Genel Kullanıcı Katmanı Resimler
<div>
  <h4>Hoşgeldiniz Sayfası</h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(615).png">
  <br />
  <h4>Hoşgeldiniz Sayfası Devamı
  </h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(618).png">
  <br />
  <h4>İş İlanları Sayfası **Bu Safyaya Henüz Sayfalama Eklenmedi.</h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(619).png">
  <br />
  <h4>Giriş Yap Sayfası</h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(600).png">
  <br />
  <h4>Kayıt Ol Sayfası</h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(601).png">
  <br />
  <h4>İş Veren Kayıt Ol Sayfası</h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(606).png">
  <br />
  <h4>İşçi Kayıt Ol Sayfası</h4>
  <img src="https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(604).png">
</div>



<!-- ROADMAP -->
<!-- ## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).
 -->


<!-- CONTRIBUTING -->
<!-- ## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->



<!-- CONTACT -->
<!-- ## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/fmutlu68/hrmsSystemUI](https://github.com/fmutlu68/hrmsSystemUI) -->



<!-- ACKNOWLEDGEMENTS -->
<!-- ## Acknowledgements

* []()
* []()
* []() --> 



[contributors-shield]: https://img.shields.io/github/contributors/fmutlu68/hrmsSystemUI.svg?style=for-the-badge
[contributors-url]: https://github.com/fmutlu68/hrmsSystemUI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/fmutlu68/hrmsSystemUI.svg?style=for-the-badge
[forks-url]: https://github.com/fmutlu68/hrmsSystemUI/network/members
[stars-shield]: https://img.shields.io/github/stars/fmutlu68/hrmsSystemUI.svg?style=for-the-badge
[stars-url]: https://github.com/fmutlu68/hrmsSystemUI/stargazers
[issues-shield]: https://img.shields.io/github/issues/fmutlu68/hrmsSystemUI.svg?style=for-the-badge
[issues-url]: https://github.com/fmutlu68/hrmsSystemUI/issues
[product-screenshot]: https://github.com/fmutlu68/hrmsSystemUI/blob/master/documentation/images/Ekran%20G%C3%B6r%C3%BCnt%C3%BCs%C3%BC%20(600).png
