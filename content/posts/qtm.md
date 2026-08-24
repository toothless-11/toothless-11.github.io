---
date: 2024-01-24T18:09:49-08:00
params:
  math: true
title: Quantum mechanic basics
---

# crystal
## lattice 晶格/点阵
是一组在空间中按周期律排列的几何点（阵点）的集合。这些点本身不代表原子，只代表`位置`。它描述的是平移对称性（周期性）。
## Unit cell & primitive cell 晶胞和原胞
单晶材料中，周期性重复排列，构成晶体的一小部分晶体,叫做`晶胞`。
Minimal of `unit cells` are called `primitive cells`.

## Miller indices & Miller plane
`Miller indices` are the `Integer normal vectors` of `Miller planes`.

# Schrodinger Equation
## $\Psi(x, t)$ 波函数
>是given $t$ 下的关于 $x$ 的**连续**函数，使用连续变量几率来刻画electron的分布
>一维空间中 $$P(a \leq x \leq b) = \int_{a}^{b} |\Psi(x)|^2    dx$$
>共轭和求导具有独立性 $$   ( \frac{\partial \psi}{\partial t}    )^* = \frac{\partial \psi^*}{\partial t}$$

## 定理
1. Schrodinger Equation 的解 $\Psi(x, t)$ 自动满足normalization.
2. 根据归一化条件和物理直觉，电子出现在无穷远的概率为0.所以 $ x \to \infty, \Psi \to 0$.
3. 时间和空间独立。若 $\psi(x) = \phi(t)$, 则 $\psi(x) = \phi(t) = Const$.
4. 若 $V = V(x)$ , `波函数`可以分离变量, $\Psi(x, t) = \psi(x)    \phi(t)$
5. 分离变量后得到`定态薛定谔方程` ，很容易看出来定态情况下，`波函数`的模平方只和 $x$ 有关
$$\hat{H}\psi(x) = E\psi(x)\qquad\hat{H} = -\frac{\hbar^2}{2m} \nabla^2 + V(x)$$
$$\phi(t) = e^{-iEt/\hbar}\qquad\Psi(x, t) = \psi(x) e^{-iEt/\hbar}$$
6. $V(x) = \infty$ 处，$\phi(x) = 0$ ，否则能量无穷大

---
## 几种写法
### N个电子
$$ i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}_1, \mathbf{r}_2, \ldots, \mathbf{r}_N, t) = \hat{H} \Psi(\mathbf{r}_1, \mathbf{r}_2, \ldots, \mathbf{r}_N, t) $$

$$ \hat{H} = \sum_{i=1}^{N}    [ -\frac{\hbar^2}{2m_i} \nabla_i^2 + V(\mathbf{r_i} , t)    ] + \sum_{i < j} V_{ij}(\mathbf{r_i} - \mathbf{r_j}) $$

>通常用单电子叠加近似来分析多电子的问题，这样就可以忽略势中的**耦合项** $V_{ij}$ ,从而可以把多变量薛定谔方程的波函数分离变量 $$\Psi \approx \psi_1(\mathbf{r}_1) \cdot \psi_2(\mathbf{r}_2) \cdot \dots \cdot \psi_N(\mathbf{r}_N)$$
最终化为**单个电子，定态**的情况
### 单个电子，定态
$$ \hat{H} \psi(\mathbf{r}) = E \psi(\mathbf{r}) $$

$$    [ -\frac{\hbar^2}{2m} \nabla^2 + V(\mathbf{r})    ] \psi(\mathbf{r}) = E \psi(\mathbf{r}) $$
### 一般情况、定态的简化写法
$$ i\hbar \frac{\partial}{\partial t} \Psi = \hat{H} \Psi $$

$$ \hat{H} \psi = E \psi $$

---
## 常见理想 $V(x)$ 模型
### Free electron gas
$V = 0$ anywhere, $E > 0$
定态薛定谔方程：
$$-\frac{\hbar^2}{2m}\nabla^2 \psi(\mathbf{r}) = E \psi(\mathbf{r})$$

通解：
$$\psi(\mathbf{r}) = A e^{i \mathbf{k} \cdot \mathbf{r}} + B e^{-i \mathbf{k} \cdot \mathbf{r}}\qquad \mathbf{k} = \frac{\sqrt{2mE}}{\hbar}$$

代入得：
$$\frac{\hbar^2 k^2}{2m} = E$$

### 一维无限深方势阱

$$V(x)=0，0<x<L\qquad V(x)=\infty，x\leq0 或 x\geq L$$
**阱外** $\psi(x)=0$
**阱内**定态薛定谔方程：
$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}=E\psi$$

通解：$\psi(x)=A\sin(kx)+B\cos(kx)$

边界条件 $\psi(0)=0 \qquad \psi(L)=0$ 和归一化条件得

$$kL=n\pi，n=1,2,3,\cdots$$

$$k=\frac{n\pi}{L} \qquad E_n=\frac{\hbar^2 k^2}{2m}=\frac{\hbar^2 n^2\pi^2}{2mL^2}$$

$$
\psi_n(x)=
\begin{cases}
\sqrt{\frac{2}{L}}\sin   (\frac{n\pi x}{L}   ), & 0 < x < L \newline
0, & x \leq 0 \text{ 或 } x \geq L
\end{cases}
$$

$$
n=1,2,3,\cdots
$$


### 一维阶跃势

$$V(x)=0，x<0 \qquad V(x)=V_0，x>0，V_0>0$$
反射系数 $R$ ,投射系数 $T = 1- R$
#### $E>V_0$
$$k_1=\sqrt{2mE}/\hbar，k_2=\sqrt{2m(E-V_0)}/\hbar$$
$$\psi(x)=
\begin{cases}
e^{ik_1x}+R e^{-ik_1x}, & x<0 \newline
T e^{ik_2x}, & x>0
\end{cases}$$
$$R=(k_1-k_2)/(k_1+k_2)，T=2k_1/(k_1+k_2)$$

#### $0<E<V_0$
$$k=\sqrt{2mE}/\hbar，\kappa=\sqrt{2m(V_0-E)}/\hbar$$
$$\psi(x)=
\begin{cases}
e^{ikx}+R e^{-ikx}, & x<0 \newline
T e^{-\kappa x}, & x>0
\end{cases}$$
$$R=(k-i\kappa)/(k+i\kappa)，T=2k/(k+i\kappa)$$

### 有限宽tunneling

*   **区域 I ($x < 0$):** $V=0$
*   **区域 II ($0 < x < L$):** $V=V_0$ （势垒内部）
*   **区域 III ($x > L$):** $V=0$

####  The Setup
Schrödinger equation: $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi$.
Define wave numbers:
*   $k = \frac{\sqrt{2mE}}{\hbar}$ (outside, $E > 0$)
*   $\kappa = \frac{\sqrt{2m(V_0-E)}}{\hbar}$ (inside, $V_0 > E$)

####  General Solutions
$$\psi(x)=
\begin{cases}
e^{ikx} + R e^{-ikx}, & x < 0 \newline
A e^{\kappa x} + B e^{-\kappa x}, & 0 \le x \le L \newline
T e^{ikx}, & x > L 
\end{cases} 
$$

其中：
*   $k = \frac{\sqrt{2mE}}{\hbar}$
*   $\kappa = \frac{\sqrt{2m(V_0 - E)}}{\hbar}$
*   $R$ 是反射振幅，$T$ 是透射振幅，$A$ 和 $B$ 是势垒内部的波函数系数

#### Boundary Conditions
At $x=0$ and $x=L$, both $\psi$ and $\frac{d\psi}{dx}$ must be continuous:
1.  **At $x=0$:**
    *   $1 + R = A + B$
    *   $ik(1 - R) = \kappa(A - B)$
2.  **At $x=L$:**
    *   $A e^{\kappa L} + B e^{-\kappa L} = T e^{ikL}$
    *   $\kappa(A e^{\kappa L} - B e^{-\kappa L}) = ik T e^{ikL}$

#### Solving for Transmission ($T$)
By eliminating $A, B,$ and $R$ through algebraic substitution, we solve for the transmission amplitude $T$:
$$T = \frac{e^{-ikL}}{\cosh(\kappa L) + i\frac{\kappa^2 - k^2}{2k\kappa} \sinh(\kappa L)}$$

The **Transmission Probability** $P = |T|^2$ is obtained using $|T|^2 = T \cdot T^*$:
$$P =    [ 1 + \frac{V_0^2 \sinh^2(\kappa L)}{4E(V_0 - E)}    ]^{-1}$$

。

### 单电子原子（类氢原子）

能量：
$$E_n=-\frac{\mu Z^2 e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\frac{1}{n^2}=-\frac{Z^2}{n^2}\times13.6\text{ eV}，n=1,2,3,\cdots$$

波函数：
$$\psi_{nlm}(r,\theta,\phi)=R_{nl}(r)Y_{lm}(\theta,\phi)$$

主量子数 $n=1,2,3,\cdots$，角量子数 $l=0,1,\cdots,n-1$，磁量子数 $m=-l,-l+1,\cdots,l$

---

单原子势场中，电子占据discrete energy level;多原子晶体中，因为`泡利不相容原理`，分离的能级会散开成几乎连续的能量范围。这个电子能量的取值范围是由`薛定谔方程`与势函数（`Dirac Comb`和`Kronig-Penney`）计算 $k$ 是否有解确定的。有解的能量范围为允带，无解的是禁带。由于允带内相邻能级的间隙很小，所以我们将这个范围视为连续。连续的意思是，能带内部的每个能量值都有可能被取到/被电子占据。

