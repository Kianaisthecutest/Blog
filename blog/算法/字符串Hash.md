---
title: 字符串Hash
date: 2024-12-10
slug: 算法/字符串Hash
tags: [算法, 字符串, 哈希]
---

{/*truncate*/}

## <font color="dd1e13">定义</font>

<h5>我们定义一个把字符串映射到整数的函数f，这个 f 称为是 Hash 函数，我们希望这个函数 f 可以方便地帮我们判断两个字符串是否相等</h5>

***

## <font color="dd1e13">中心思想</font>

<h3>将输入映射到一个值域较小，可以方便比较的范围，一般是将字符串视为一个p进制数去进行Hash值的计算</h3>

***

## <font color="dd1e13">重要性质</font>
```
在 Hash 函数值不一样的时候，两个字符串一定不一样；
```

```
在 Hash 函数值一样的时候，两个字符串不一定一样（但有大概率一样，且我们当然希望它们总是一样的）
我们将 Hash 函数值一样但原字符串不一样的现象称为哈希碰撞
为了尽量避免这种情况，一般将进制p设为131或13331这两个质数
```

***

## <font color="dd1e13">代码实现</font>

```cpp
//计算一段的Hash值
unsigned long long get( int a,int b )
{
return h[b] - h[a] * power[b-a+1]；
//将前b个的Hash减去前a个的Hash，因为对于h[a]，在h[b]中它的值是h[a]的p^(b-a+1)倍（每次计算Hash时会对其前缀额外乘p）,所以要对h[a]乘上power[b-a+1]
}
```

```cpp
//构建Hash数组
power[0]=1;//存储幂次方的数组
int len=strlen( A+1 );
for( int i=1;i<=len;i++ )
{
	h[i]=h[i-1]*p+A[i];//即进制转换的思想
	power[i]=power[i-1]*p;
}

//超快速的比对
for( int i=1;i<=m;i++ )
{
	int l1, r1, l2, r2;
	scanf( "%d%d%d%d",&l1 , &r1, &l2, &r2 );//需要比对的两个区间
	if( get( l1,r1 ) == get( l2,r2 ) )      //一般会封装一个get函数去获得对应段的Hash值
	{
		printf( "Same" );
	}	
	else
	{
		printf( "Different" );
	}
}
```

***

## <font color="dd1e13">时间复杂度</font>

将$O(n)$的比对提速到$O(1)$

***

## ~~奇技淫巧~~<font color="dd1e13">小技巧</font>

<h3>(1):</h3>

对于回文串的判断

可以在每两个字符之间插入一个不会影响题目的字符并在两端再加入此字符，就可以保证修改后长度为奇数

就可以使用中点扩散法了

<h3>(2):</h3>

存储hash值时，难免会有数据大小溢出的情况产生，此时需要我们重复mod一个值

又因为在C++中电脑计算mod运算的速度很慢

所以我们可以使用64位无符号长整型unsigned long long存储hash值（但是容易被特殊构造数据卡，建议加梅林旋转上保险，要是还是WA就写手动取模吧）

这样在hash值超过ull上限时会直接归零，相当于不断地mod上$2^{64}-1$

可以有效且便捷的提速
