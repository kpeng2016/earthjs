export default () => {
    const datumGraticule = d3.geoGraticule()();
    const _ = {style: {}, drawTo: null};

    function create() {
        const __ = this._;
        if (__.options.showGraticule) {
            if (__.options.transparent || __.options.transparentGraticule) {
                __.proj.clipAngle(180);
            }
            this.canvasPlugin.render(function(context, path) {
                context.beginPath();
                path(datumGraticule);
                context.lineWidth = 0.4;
                context.strokeStyle = _.style.line || 'rgba(119,119,119,0.6)';
                context.stroke();
            }, _.drawTo);
            if (__.options.transparent || __.options.transparentGraticule) {
                __.proj.clipAngle(90);
            }
        }
    }

    return {
        name: 'graticuleCanvas',
        onInit() {
            this._.options.transparentGraticule = false;
            this._.options.showGraticule = true;
        },
        onCreate() {
            create.call(this);
        },
        onRefresh() {
            create.call(this);
        },
        drawTo(arr) {
            _.drawTo = arr;
        },
        style(s) {
            if (s) {
                _.style = s;
            }
            return _.style;
        },
    }
}
