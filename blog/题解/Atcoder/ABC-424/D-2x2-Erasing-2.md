---
title: 2x2 Erasing 2
date: 2025-09-21
slug: 题解/Atcoder/ABC-424/D-2x2-Erasing-2
tags: [题解, 动态规划, 状态压缩]
---

{/*truncate*/}

<h5>

题意：使不存在$2\times 2$的黑色矩阵

解题思路：并不是很一眼顶针的状压DP，只需要压一下然后暴力跑就可以了

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=8, M=( 1<<7 );

int a[N];
int dp[N][M];

void sovel()
{
  int n, m;
  cin>>n>>m;
  for( int i=1;i<=n;i++ )
  {
    string s;
    cin>>s;
    a[i]=0;//lz就是这里忘清空改半天改不出来的
    for( int j=0;j<m;j++ )
      if( s[j] == '#' )
        a[i]|=( 1<<j );//将每一行存储为一个01串的形式
  }
  memset( dp,0x1f,sizeof( dp ) );
  dp[0][0]=0;
  for( int i=1;i<=n;i++ )
    for( int s1=0;s1<( 1<<m );s1++ )
      for( int s2=0;s2<( 1<<m );s2++ )
      //状压经典枚举状态
      {
        int s=s1&s2;
        if( s&( s>>1 ) ) continue;//自己画图思考这里为什么可以表示2X2的矩阵
        dp[i][s2]=min( dp[i][s2],dp[i-1][s1]+__builtin_popcount( s2^a[i] ) );//状态转移(转移花费是从图上状态与转移后状态的不同位个数)
      }
  int ans=dp[n][0];
  for( int s=0;s<( 1<<m );s++ )
      ans=min( ans,dp[n][s] );
  cout<<ans<<"\n";
}

int main()
{
  // freopen( "txt.in","r",stdin );
  ios::sync_with_stdio( false );
  cin.tie( nullptr ), cout.tie( nullptr );
  int t;
  for( cin>>t;t;t-- )
    sovel();
}
```

</details>

**时间复杂度**：$O(n\times 2^{2m})$