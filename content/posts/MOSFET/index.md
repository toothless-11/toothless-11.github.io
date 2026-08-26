---
date: 2026-08-25
params:
  math: true
title: MOSFET
---


# quantum mechanical tunneling
![alt text](image-1.png)
>Electrons are traveling waves, if barrier is higher than energy, electron becomes a decaying wave.

## tunneling probabiltiy

Check [有限宽tunneling](../qtmmchnic.md#有限宽tunneling) for quantum mechanics

**tunneling probabiltiy**

$$P =    [ 1 + \frac{V_0^2 \sinh^2(\kappa L)}{4E(V_0 - E)}    ]^{-1}$$

当 $\kappa L$ 很大时，$\sinh(\kappa L) \approx \frac{1}{2} e^{\kappa L}$
$$P \approx    [ \frac{V_0^2 \cdot (\frac{1}{2} e^{\kappa L})^2}{4E(V_0 - E)}    ]^{-1}$$
$$P \approx    [ \frac{V_0^2}{16E(V_0 - E)} e^{2\kappa L}    ]^{-1}$$
$$P \approx \frac{16E(V_0 - E)}{V_0^2} \cdot e^{-2\kappa L}$$

- $m$ is `electron effective mass`
- $L$ is  `barrier thickness`

**The tunneling probability increases exponentially with decreasing `barrier thickness`**

# Ohmic contact

>1. metal-semicondutuctor interface has `schottky barrier`
>2. Semiconductor devices are connected to each other in an integrated circuit through metal. The semiconductor to metal contacts should have sufficiently low resistance so that they do not overly degrade the device performance. These low-resistance contacts are called `ohmic contacts`. A surface layer of a heavily doped semiconductor diffusion region is converted into a silicide and a dielectric (usually SiO2) film is deposited.
>3. An important feature of all good ohmic contacts is that the semiconductor is very **heavily doped**. The `depletion layer` of the heavily doped Si is only tens of Å thin because of the high dopant concentration.

如果只是metal-semiconductor，carrier多，但width过宽

**high doping -> 高载流子浓度和窄势垒 -> 明显quantum mechanical tunneling**


$$
L \approx W_{\text{dep}}/2 = \sqrt{\varepsilon_s \phi_{Bn}/(2qN_d)}
$$

$$
P \approx e^{-H\phi_{Bn}/\sqrt{N_d}}
$$

$$
H \equiv \frac{2}{\hbar} \sqrt{\varepsilon_s m_n/q}
$$

At $V = 0$

$$
J_{S \to M} (= -J_{M \to S}) \approx \frac{1}{2} qN_d v_{\text{th}} P \approx \frac{1}{2} qN_d v_{\text{th}} e^{-H\phi_{Bn}/\sqrt{N_d}}
$$

At small  V , the net current density is
$$
J \approx    . \frac{d J_{S \to M}}{dV}    |_{V = 0} \cdot V = V \cdot \frac{1}{2} q v_{\text{thx}} H \sqrt{N_d} e^{-H \phi_{Bn} / \sqrt{N_d}}
$$

$$
R_c \equiv \frac{V}{J} = \frac{2 \cdot e^{H \phi_{Bn} / \sqrt{N_d}}}{q v_{\text{thx}} H \sqrt{N_d}}
$$

$$
\propto e^{H \phi_{Bn} / \sqrt{N_d}}
$$

$R_c$ is the **specific contact resistance** ($ \Omega \text{cm}^2$), the resistance of a 1 $cm^2$ contact. This resistance decrease **exponentially** when $L$ decrease.

# mosfet
![alt text](image.png)

![alt text](image-2.png)
>图中可见$N^+ , P^+$这两个连接metal和substrate的`ohmic contact`，显著降低电阻

## surface mobility
>electron or hole **mobility in the surface inversion layer** $\leftarrow$  **large** transistor current $\rightarrow$ **快速充放电**

When a small $ V_{ds}$ is applied, the drain to source current, $ I_{ds} $ is

$$
I_{ds} = W \cdot Q_{\text{inv}} \cdot v = W Q_{\text{inv}} \mu_{ns} \mathcal{E} = W Q_{\text{inv}} \mu_{ns} V_{ds} / L
$$
[check inversion for the capacitance explanation](../MOScap/moscap.md#strong-inversion-beyond-threshold)
$$
= W C_{\text{oxe}} (V_{gs} - V_t) \mu_{ns} V_{ds} / L
$$


- $W$ is the **channel width**. 
- $ Q_{\text{inv}} \qquad C/\text{cm}^2 $ is the inversion charge density 
- $ \mathcal{E} $ is the channel electric field
- $L$ is the **channel length**
- $ \mu_{ns} $ is the electron **surface mobility**, or the **effective mobility**.

---
### calculating mobility
![alt text](image-4.png)

$\mu_{ns}$ has been found to be a function of the average of $\mathcal{E}_b$ and $\mathcal{E}_t$
$\mathcal{E}_b$ is the field on the border of `inv layer`and `dep layer`
$\mathcal{E}_t$ is the field on the border of `oxide`and `inv layer`

Now let's figure out the two:
>$Q_{dep}$ and $Q_{inv}$ are charge density per unit area (C/cm2)

- $\mathcal{E}_t$
Apply **Gauss’s Law** to a box that encloses the depletion layer and the inversion layer.
**Using boundary condition** : $\mathcal{E} = 0$ on the border of `dep layer` and `p bulk`bcs of **electric field continuity**.

$$
\mathcal{E_t} = -(Q_{dep} + Q_{inv}) / \epsilon_s
$$

$$
= \mathcal{E_b} - Q_{inv} / \epsilon_s = \mathcal{E_b} + \frac{C_{oxe}}{\epsilon_s}(V_{gs} - V_t)
$$

$$
= \frac{C_{oxe}}{\epsilon_s}(V_{gs} - V_{fb} - \phi_{st})
$$

- $\mathcal{E_b}$
Apply Gauss’s Law to a box that encloses the depletion layer and the inversion layer.
**Using boundary condition** : $\mathcal{E} = 0$ on the border of `dep layer` and `p bulk`bcs of **electric field continuity**.
$$
\mathcal{E_b} = - Q_{dep} / \epsilon_s = \frac{C_{oxe}}{\epsilon_s}(V_t - V_{fb} - \phi_{st})
$$

- Average
$$
\frac{1}{2}(\mathcal{E_b} + \mathcal{E_t}) = \frac{C_{oxe}}{2\epsilon_s}(V_{gs} + V_t - 2V_{fb} - 2\phi_{st})
$$

$$
\approx \frac{C_{oxe}}{2\epsilon_s}(V_{gs} + V_t + 0.2    V)
$$

$$
= \frac{\epsilon_{ox}}{2\epsilon_s T_{oxe}}(V_{gs} + V_t + 0.2    V)
$$

$$
= \frac{V_{gs} + V_t + 0.2    V}{6T_{oxe}}
$$

# new chapter
## 

