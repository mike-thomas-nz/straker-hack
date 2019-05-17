import $ from "jquery";

var PF_SRT = function() {
  // eslint-disable-next-line
  var pattern = /(\d+)\n([\d:.]+)\s+-{2}\>\s+([\d:.]+)\n([\s\S]*?(?=\n{2}|$))/gm;

  var init = function() {
    new RegExp(pattern);
  };
  var parse = function(f) {
    if (typeof(f) != "string")
      throw "Sorry, Parser accept string only.";

    var result = [];
    if (f == null)
      return '';

    f = f.replace(/\r\n|\r|\n/g, '\n')
      var matches = '';
    while ((matches = pattern.exec(f)) != null) {
      result.push(toLineObj(matches));
    }
    return result;
  }
  var toLineObj = function(group) {
    return {
      line: group[1],
      startTime: group[2],
      endTime: group[3],
      text: group[4]
    };
  }
  init();
  return {
    parse: parse
  }
}();

$.get('resources/subs/rocket/english_webvtt.srt')
  .done(function(text) {
    try {
      //Array with {line, startTime, endTime, text}
      var result = PF_SRT.parse(text);

      $.each(result, function(index, value) {
        $("#table_div").append("<tr id=caption_"+value.line+"><td>"+value.line+"</td><td>" + value.startTime+ "</td><td>" + value.text + "</td><td><div id='editable' contenteditable=true></div></div></td><td><button class='btn btn-success btn-sm'>Save</button></td></td></tr>");
      });

    } catch (e) {
      // console.log(e);
      //handle parsing error
    }
});