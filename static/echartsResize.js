window._echartsInstances = window._echartsInstances || [];

window.addEventListener("resize", () => {
	window._echartsInstances.forEach((c) => {
		if (c && !c.isDisposed()) {
			c.resize();
		}
	});
});
