---
title: cout与保留小数
date: 2025-08-14
slug: 技巧/cout与保留小数
tags: [技巧]
---

{/*truncate*/}

<h4>

对于$cout$操作，由于编译器内部的某些神神奇奇的调整，会导致双精度浮点数数$double$精度失真，具体表现为自动保留部分有效数字而舍弃后面的导致答案错误

解决这个问题有两种方法，一是改用$printf$，二是增加函数，具体如下

</h4>

```c++
cout<<fixed<<setprecision( 8 )<<x;
//fixed声明后面的函数的生效域为小数点后
//setprecision( n )能保留n位有效数字
```