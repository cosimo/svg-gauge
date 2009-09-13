/* SVG Gauge control - Cosimo 17/7/2008 */
function update_gauge(id, value, scale, is_percent) {

    /* 100 is the default scale limit */
    if (!scale) scale = 100;
    if (!is_percent) is_percent = false;
    var el=document.getElementById(id);
    if (!el) return;

    /* Get SVG document from HTML element */
    var svg_doc = el.contentDocument;
    if (!svg_doc) return;

    /* Text gauge value */
    var text_el = svg_doc.getElementById('value');
    if (!text_el) return;
    text_el.textContent = value;
    if (is_percent) text_el.textContent += '%';

    /* Rotate needle to display given value */
    var needle_el = svg_doc.getElementById('needle');
    if (!needle_el) return;
    /* Calc rotation angle (0->0%, 260->100%) */
    value = parseInt(value);
    scale = parseInt(scale);
    if (value < 0) value = 0;
    if (value > scale) value = scale;
    var angle = value / scale * 260;
    /* On-the-fly SVG transform */
    needle_el.setAttribute('transform','rotate('+angle+',62,62)');

    /* Show blinking led if something out of range */
    var led=svg_doc.getElementById('ledAnimation');
    if (!led) return;
    led.setAttribute('repeatCount', angle > (260 * 0.75)
        ? 'indefinite'
        : '0'
    );
}
