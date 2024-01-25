input.onButtonEvent(Button.AB, input.buttonEventValue(ButtonEvent.Click), function () {
    t_Musik = !(t_Musik)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), function () {
    t_co2 = !(t_co2)
})
function zeigeOLED () {
    oledssd1306.clearDisplay()
    oledssd1306.setTextXY(0, 0)
    oledssd1306.writeString("Messwerte:")
    oledssd1306.setTextXY(1, 0)
    oledssd1306.writeString("CO2: ")
    oledssd1306.writeNumber(co2)
    oledssd1306.setTextXY(2, 0)
    oledssd1306.writeString("TVOC: ")
    oledssd1306.writeNumber(tvoc)
}
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), function () {
    t_voc = !(t_voc)
})
let tvoc = 0
let co2 = 0
let t_Musik = false
let t_voc = false
let t_co2 = false
SG33.address(true)
t_co2 = false
t_voc = false
t_Musik = true
oledssd1306.initDisplay()
oledssd1306.flipScreen()
basic.forever(function () {
    co2 = SG33.eCO2()
    tvoc = SG33.TVOC()
    if (co2 < 1000 && tvoc < 400) {
        basic.setLedColor(0x00ff00)
    } else if (co2 < 1400 && tvoc < 400) {
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x0000ff)
        if (t_Musik) {
            music.playTone(262, music.beat(BeatFraction.Whole))
            music.playTone(330, music.beat(BeatFraction.Whole))
            music.playTone(392, music.beat(BeatFraction.Whole))
        }
    }
    zeigeOLED()
    if (t_co2) {
        Zahlencodierung.zeigeNSorobancodiertAn(co2)
        t_co2 = !(t_co2)
    } else if (t_voc) {
        Zahlencodierung.zeigeNSorobancodiertAn(tvoc)
        t_voc = !(t_voc)
    }
    basic.pause(5000)
    basic.clearScreen()
})
