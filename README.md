<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* 卡片容器 */
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
        }

        /* 卡片样式 */
        .card {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-size: contain;
          background-position: center;
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        /* 卡片悬停效果 */
        .card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
        }

        .card:hover::after {
          opacity: 1;
        }
      </style>
</head>

<body>
    <h1 align="center"> <a href="https://sunguoqi.com/"> <img
                src="https://readme-typing-svg.herokuapp.com/?lines=console.log(%22龙少%2C%20你好!%22);lotawei祝您今天愉快!&center=true&size=27">
        </a> </h1>
    <a href="https://github.com/lotawei">
        <img align="right"
            src="https://komarev.com/ghpvc/?username=lotawei&label=Visitors&color=red&style=flat&logo=github"
            alt="gtihub-visitors" />
    </a>
    </details>
    <br>✨ 诸位大仙，我是lotawei,主要从事移动端开发致力于成为一名全栈开发者，平常喜欢捣鼓，喜欢编程。</br>
    <br>该站存放本人的一些代码程序，顺便记录自己的随想心得。</br>
    <br> 🤣欢迎大家来和我讨论技术上问题以及商业的一些合作</br>

    <br>

    <p align="center">
        <a href="https://github.com/lotawei" class="rich-diff-level-one">
            <img src="https://github-readme-stats.vercel.app/api?username=lotawei&title_color=333&text_color=777&show_icons=false&theme=transparent"
                alt="lotawei's Stats"></img>
        </a>
    </p>

    <p align="center">
        <a href="https://i.ibb.co/Prx2vwm/pic.jpg" target="_blank" alt="WeChat" title="WeChat">
            <img src="https://img.icons8.com/ios-filled/50/000000/weixing.png" width="28px" />
        </a>
        &emsp;

        <a href="https://www.jianshu.com/u/d20c314d353d" target="_blank" alt="jianshu" title="jianshu">
            <img src="https://img.icons8.com/material/48/000000/jianshu.png" width="30px" />
        </a>
        &emsp;
        <br><br>
        <a href="https://github.com/lotawei">
            <img src="https://badges.strrl.dev/visits/lotawei/lotawei?style=flat-square&color=black&logo=github">
        </a>
        <a href="https://github.com/lotawei">
            <img src="https://badges.strrl.dev/years/lotawei?style=flat-square&color=black&logo=github">
        </a>
        <a href="https://github.com/lotawei?tab=repositories">
            <img src="https://badges.strrl.dev/repos/lotawei?style=flat-square&color=black&logo=github">
        </a>
        <a href="https://gist.github.com/lotawei">
            <img src="https://badges.strrl.dev/gists/lotawei?style=flat-square&color=black&logo=github">
        </a>
        <a href="https://github.com/lotawei">
            <img src="https://badges.strrl.dev/commits/monthly/lotawei?style=flat-square&color=black&logo=github">
        </a>
    </p>
    <div class="card-container">
        <!-- 卡片动态加载图片 -->
        <div class="card" style="background-image: url('https://i.ibb.co/SQHNMXh/941724378190-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/m9qx6gY/961724378193-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/Bt2tzzy/1021724378202-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/cQHLbJm/1101724378215-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/g3zDfBZ/1161724378223-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/cb3GcfV/1191724378228-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/jHm3pzD/1261724378241-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/BNByLF2/1321724378251-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/r3kvsSh/1371724378259-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/xHwnQwY/1381724378260-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/VDsX3VJ/1401724378262-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/TrPcpnV/931724378189-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/SyVXt81/1011724378201-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/TrPcpnV/931724378189-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/nBR5z2V/1041724378205-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/nBR5z2V/1041724378205-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/jRc5Ldt/1061724378208-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/GsVJXN2/1111724378216-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/7nb6yW7/1151724378222-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/jbhwXz7/1201724378230-pic.jpg');"></div>
        <div class="card" style="background-image: url('    https://i.ibb.co/1nJgFr0/1231724378236-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/t3RF9GJ/1241724378238-pic.jpg');"></div>
        <div class="card" style="background-image: url('https://i.ibb.co/6mHQ2gN/1251724378239-pic.jpg');"></div>

      </div>
</body>
