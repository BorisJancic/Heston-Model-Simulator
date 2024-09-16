from . greeks import *

step = 65

def graph_call(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = round((Call(S[i], K, T[j], sigma, r)), 3)

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_call_T_vol(S_t, K, T, sigma_0, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    sigma = [sigma_0*3*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = round((Call(S[i], K, T, sigma[j], r)), 3)

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_gamma(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = (gamma(S[i], K, T[j], sigma, r))

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_delta(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = (delta(S[i], K, T[j], sigma, r))

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_gamma(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = (gamma(S[i], K, T[j], sigma, r))

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_vega(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = (vega(S[i], K, T[j], sigma, r))

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_theta(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = (theta(S[i], K, T[j], sigma, r))

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_rho_S_T(S_t, K, T_0, sigma, r, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    T = [T_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(steps):
        for j in range(steps):
            value[i][j] = (rho(S[i], K, T[j], sigma, r))

    return {'type': 'surface', 'x': S, 'y': T, 'z': value}

def graph_rho_S_r(S_t, K, T, sigma, r_0, steps=step):
    S = [2*i*S_t/steps for i in range(1, steps+1)]
    r = [r_0*i/steps for i in range(1, steps+1)]
    value = [[0]*steps for i in range(steps)]

    for i in range(100):
        for j in range(100):
            value[i][j] = (Call(S[i], K, T, sigma, r[j]))

    return {'type': 'surface', 'x': S, 'y': r, 'z': value}


# graph_call_T_vol(50, 50, 1, 0.5, 0.001)
# graph_call(50, 50, 1, 0.5, 0.001)
# graph_rho_S_T(50, 50, 1, 0.5, 0.001)
# graph_rho_S_r(50, 50, 1, 0.5, 0.1)
# graph_theta(50, 50, 1, 0.5, 0.001)
# graph_delta(50, 50, 1, 0.5, 0.001)
# graph_gamma(50, 50, 1, 0.5, 0.001)
# graph_vega(50, 50, 1, 0.5, 0.001)