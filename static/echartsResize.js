window._echartsInstances = [];
window.addEventListener("resize", () => {
	window._echartsInstances.forEach((c) => {
		c.resize();
	});
});
