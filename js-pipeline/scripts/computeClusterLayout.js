export const computeClusterCenterPosition = (monthIndex, maxMonthRadiusInYear, prevLevelsRadius, paddingScale = 0.1) => {
    const padding = maxMonthRadiusInYear * paddingScale;
    const radius = prevLevelsRadius + padding + maxMonthRadiusInYear / 2;
    const angle = monthIndex * Math.PI / 6; // 1 radian = (180 degrees)/Math.PI

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return [x, y];
}
