<div dir="rtl">
<h1 dir="ltr">Algovisual</h1>

<p >هدف این پروژه نمایش تمام مراحل اجرا وپیاده سازی الگوریتم های مرتب سازی می باشد. در این پروژه الگوریتم هایی که پیاده سازی شده است عبارتند از: 
<ul>
<li >مرتب سازی حبابی</li>
<li >مرتب سازی انتخابی</li>
<li >مرتب سازی درجی</li>
<li >مرتب سازی ادغامی</li>
<li >مرتب سازی سریع</li>
</ul>
</p>

<h1 >نصب و راه اندازی</h1>

<p >این پروژه با استفاده از جاوا اسکریپت، HTML و Json پیاده سازی شده 
 است و همچین از کتابخانه منبع باز <a href="https://github.com/vkaravir/JSAV">JSAV</a> برای تصویر سازی مراحل و <a href="https://github.com/OpenDSA/OpenDSA">OpenDSA</a> برای بررسی ورودی ها و نمایش توضیحات مراحل استفاده شده است.  </p>

<p > برای نمایش کامل و صحیح   پروژه نیاز به بارگذاری آن بر روی وب سرور می باشیم و صرفا اجرای فایل Html خروجی کاملی در اختیار ما قرار نمی دهد.</p>
<p > برای اجرا پروژه می توان از هر نوع وب سرور
 (هاست)  چه به صورت رایگان که برخی از سایت ها ارائه می کنند  و یا به صورت شبیه سازهایی مانند WampServer یا Xampp استفاده نمود.</p>
<p > </p>
<h3 >راه اندازی پروژه بر روی شبیه ساز</h3>
<p >در اینجا ما در نظر می گیریم که سیستم عامل windows می باشد.</p>
<p >1- ابتدا برنامه git نسخه مناسب سیستم عامل خود را ازاین <a href="https://git-scm.com/downloads">لینک</a> دانلود کرده و نصب می کنیم.</p>

<p >2- سپس  نسخه مناسب شبیه ساز Xampp از این <a href="https://www.apachefriends.org/download.html">لینک</a> یا WampServer از این <a href="https://www.wampserver.com/en/">لینک</a> دانلود کرده و نصب می کنیم. راهنمای نصب را می توانید در گوگل جستجو کنید.</p>



<p >3- پس از انجام مراحل بالا برنامه git bash را اجرا کرده و بر اساس نوع شبیه سازی که نصب کرده ایم   واگر مسیر نصب راتغییر نداده باشیم با استفاده از دستور مناسب به مسیر مورد نظر می رویم</p>
<h5 dir="ltr" >Xampp:</h5>
<pre dir="ltr"><code >$cd /c/xampp/htdocs
</code></pre>
<h5 dir="ltr" >WampServer:</h5>
<pre dir="ltr"><code >$cd /c/wamp64/www
</code></pre>
<p >4- سپس با استفاده از دستور زیر پروژه را در مسیر مورد نظر  clone می کنیم.</p>
<pre dir="ltr"><code >$ git clone https://github.com/yasaminarfarad78/Algovisual.git Algovisual
</code></pre>
<p >5- پس از انجام دستور بالا شبیه ساز را اجرا کرده و در نوار جستجوی  
  مرورگر یکی از آدرس های زیر وارد می کنیم تا از اجرای درست شبیه ساز و همچنبن نمایش پروژه اطمبنان حاصل کنیم.
</p>
<pre dir="ltr"><code >http://127.0.0.1/Algovisual
</code></pre>
<pre dir="ltr"><code >http://localhost/Algovisual
</code></pre>
<h3 >ساختار دسته بندی فایل ها</h3>
<p >
<ul>
<li >HTML: جهت نمایش ظاهر سایت به کاربر نهایی.</li>
<li >JS: کد های جاوا اسکریپت برای اجرای الگوریتم های مرتب سازی و  اجرای درخواست های کاربر و پویایی صفحات HTML.</li>
<li >JSON: فایل های  برای انتقال داده که در این پروژه از داده های آن برای نمایش توضیحات مراحل پردازش الگوریتم وشبه کد ها استفاده می شود. </li>
<li >CSS: برای فرم دهی تغییر خصوصیات ظاهری اجزای درون HTML استفاده می شود. </li>
</ul>
پوشه AV:  سورس کدهای الگوریتم های مرتب سازی.<br>
پوشه lib: کتابخانه های استفاده شده درپروژه<br>
پوشه SourceCode: شبه کد های الگوریتم های مرتب سازی<br>
فایل index.html: فایل HTML صفحه اول سایت<br>
فایل README.md : فایلی که در حال خواندن آن هستید.
</p>

</div>