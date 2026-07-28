precision highp float;

uniform sampler2D tDiffuse;
uniform sampler2D tNoise;
uniform float uTime;
uniform bool uObserved;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    float alpha = 0.0;

    if (uObserved) {
        float brightness = texture2D(tDiffuse, vUv).r;

        if (brightness < 0.1) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            return;
        }

        float noise = texture2D(tNoise, vUv).r;
        float progress = clamp(uTime, 0.0, 0.8);

        if (progress > noise) alpha = 1.0;
    } else {
        float phaseDuration = 5.0;
        float stagnateDuration = 3.0;
        float totalCycle = phaseDuration + stagnateDuration;

        float cycleTime = mod(uTime, totalCycle);

        float cycleId = floor(uTime / totalCycle);
        vec2 noiseUv = vUv + vec2(cycleId * 0.37, cycleId * 0.71);
        float noise = texture2D(tNoise, fract(noiseUv)).r;

        float threshold;
        if (cycleTime < phaseDuration) {
            float progress = clamp((cycleTime / phaseDuration) * 0.1, 0.0, 0.1);
            threshold = 1.0 - progress;
        } else threshold = 0.9;

        if (noise > threshold) alpha = 1.0;
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}