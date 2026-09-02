'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ElectricalCircuit() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02050a, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 17);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x41516b, 1.35);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 2.9);
    topLight.position.set(0, 10, 5);
    scene.add(topLight);
    const blueLight = new THREE.PointLight(0x218cff, 6.2, 20);
    blueLight.position.set(0, 3, 2);
    scene.add(blueLight);

    const metal = new THREE.MeshStandardMaterial({ color: 0x3c4655, metalness: 0.92, roughness: 0.3 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x10161e, metalness: 0.88, roughness: 0.34 });
    const copper = new THREE.MeshStandardMaterial({ color: 0x9b4e2f, metalness: 0.86, roughness: 0.28 });
    const plastic = new THREE.MeshStandardMaterial({ color: 0x171e29, metalness: 0.2, roughness: 0.5 });

    const pathPoints = [
      new THREE.Vector3(-7, 0, -3),
      new THREE.Vector3(-7, 0, 3),
      new THREE.Vector3(-2, 0, 3),
      new THREE.Vector3(2, 0, 3),
      new THREE.Vector3(7, 0, 3),
      new THREE.Vector3(7, 0, -3),
      new THREE.Vector3(2, 0, -3),
      new THREE.Vector3(-2, 0, -3),
    ];
    const curve = new THREE.CatmullRomCurve3(pathPoints, true, 'centripetal');

    const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 400, 0.12, 12, true), metal);
    scene.add(wire);
    const energyMaterial = new THREE.MeshBasicMaterial({ color: 0x03518f, transparent: true, opacity: 0.62 });
    const energy = new THREE.Mesh(new THREE.TubeGeometry(curve, 400, 0.028, 8, true), energyMaterial);
    scene.add(energy);

    const batteryGroup = new THREE.Group();
    batteryGroup.position.set(-7, 0, -3);
    const batteryBody = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 3, 32), darkMetal);
    batteryBody.rotation.z = Math.PI / 2;
    batteryGroup.add(batteryBody);
    const positiveCap = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.52, 32), copper);
    positiveCap.rotation.z = Math.PI / 2;
    positiveCap.position.x = 1.46;
    batteryGroup.add(positiveCap);
    const negativeCap = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.2, 32), metal);
    negativeCap.rotation.z = Math.PI / 2;
    negativeCap.position.x = -1.57;
    batteryGroup.add(negativeCap);
    scene.add(batteryGroup);

    const resistorGroup = new THREE.Group();
    resistorGroup.position.set(0, 0, -3);
    const resistorBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.43, 0.43, 2, 32),
      new THREE.MeshStandardMaterial({ color: 0x735040, metalness: 0.3, roughness: 0.58 }),
    );
    resistorBody.rotation.z = Math.PI / 2;
    resistorGroup.add(resistorBody);
    [0x202020, 0xae2525, 0xc98b3e, 0x202020].forEach((color, index) => {
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.445, 0.445, 0.13, 32),
        new THREE.MeshStandardMaterial({ color, metalness: 0.45, roughness: 0.44 }),
      );
      band.rotation.z = Math.PI / 2;
      band.position.x = -0.55 + index * 0.38;
      resistorGroup.add(band);
    });
    scene.add(resistorGroup);

    const ledGroup = new THREE.Group();
    ledGroup.position.set(7, 0.35, 0);
    const ledBase = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.56, 0.5, 32), metal);
    ledGroup.add(ledBase);
    const ledGlass = new THREE.Mesh(
      new THREE.SphereGeometry(0.62, 32, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x116fff,
        emissive: 0x063eff,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.72,
        roughness: 0.08,
        metalness: 0.08,
      }),
    );
    ledGlass.scale.y = 1.35;
    ledGlass.position.y = 0.55;
    ledGroup.add(ledGlass);
    const ledCore = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshBasicMaterial({ color: 0x8fe8ff }));
    ledCore.position.y = 0.45;
    ledGroup.add(ledCore);
    const ledLight = new THREE.PointLight(0x1a7dff, 2.1, 8);
    ledLight.position.y = 0.65;
    ledGroup.add(ledLight);
    scene.add(ledGroup);

    const switchGroup = new THREE.Group();
    switchGroup.position.set(0, 0, 3);
    const switchBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.52, 1.42), plastic);
    switchBase.position.y = 0.22;
    switchGroup.add(switchBase);
    const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 1.4, 20), metal);
    lever.position.y = 0.95;
    lever.rotation.z = -0.45;
    switchGroup.add(lever);
    scene.add(switchGroup);

    const electronGeometry = new THREE.SphereGeometry(0.13, 18, 18);
    const electrons: THREE.Mesh[] = [];
    const electronCount = 18;
    for (let i = 0; i < electronCount; i += 1) {
      const electron = new THREE.Mesh(
        electronGeometry,
        new THREE.MeshBasicMaterial({ color: 0x56caff, transparent: true, opacity: 0.9 }),
      );
      electron.userData = { progress: i / electronCount, speed: 0.024 + Math.random() * 0.01, phase: Math.random() * Math.PI * 2 };
      electrons.push(electron);
      scene.add(electron);
    }

    const electronLights: THREE.PointLight[] = [];
    for (let i = 0; i < 4; i += 1) {
      const light = new THREE.PointLight(0x1492ff, 1.25, 3.4);
      electronLights.push(light);
      scene.add(light);
    }

    const clock = new THREE.Clock();
    let animationFrame = 0;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      electrons.forEach((electron) => {
        electron.userData.progress += electron.userData.speed * 0.016;
        if (electron.userData.progress >= 1) electron.userData.progress -= 1;
        const position = curve.getPointAt(electron.userData.progress);
        electron.position.copy(position);
        electron.position.y = 0.15;
        const pulse = 1 + Math.sin(time * 3 + electron.userData.phase) * 0.22;
        electron.scale.setScalar(pulse);
        (electron.material as THREE.MeshBasicMaterial).opacity = 0.62 + (Math.sin(time * 3 + electron.userData.phase) + 1) * 0.16;
      });

      electronLights.forEach((light, index) => {
        const progress = (time * 0.018 + index / electronLights.length) % 1;
        light.position.copy(curve.getPointAt(progress));
        light.position.y = 0.12;
        light.intensity = 1 + Math.sin(time * 2 + index) * 0.22;
      });

      ledLight.intensity = 1.55 + Math.sin(time * 2.5) * 0.38;
      ledCore.scale.setScalar(0.94 + Math.sin(time * 2.5) * 0.07);

      camera.position.x = Math.sin(time * 0.08) * 0.65;
      camera.position.y = 10 + Math.sin(time * 0.12) * 0.35;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" role="img" aria-label="Animated electrical circuit with battery, switch, resistor and LED" />;
}
