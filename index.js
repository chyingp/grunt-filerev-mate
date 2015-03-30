/**
 * @author chyingp
 * @description
 */
module.exports = function(grunt){
	var fs = require('fs');
	var path = require('path');

	function isBase64Path( url ){
		return url.match(/^'?data.*base64/);
	}

	function isRemotePath( url ){
		return url.match(/^'?https?:\/\//);
	}

	grunt.task.registerMultiTask('cssRev', '替换md5后的图片路径', function(){
	
		var filepaths = this.filesSrc;
		var fileContent = '';
		var summary = grunt.filerev && grunt.filerev.summary;

		if(!summary){
			console.log('quit! grunt.filerev.summary doesn\'t exist');
			return;
		}

		filepaths.forEach(function(filepath, index){
			
			// TODO 错误提示
			if(!grunt.file.exists(filepath)){
				return;
			}

			grunt.log.debug( 'filepath: '+filepath);

			fileContent = grunt.file.read(filepath);
			fileContent = fileContent.replace(/url\(["']*([^)'"]+)["']*\)/g, function(matchedWord, imgUrl){
				
				var newUrl = '';
				var ret = '';

				if(isBase64Path(imgUrl) || isRemotePath(imgUrl)){
					return matchedWord;
				}
				
				grunt.log.debug( 'imgUrl: '+imgUrl);				
				
				var dirname = path.dirname(filepath);
				var absoluteImgurl = path.resolve(dirname, imgUrl);
				
				grunt.log.debug( 'absoluteImgurl: '+absoluteImgurl);
				
				var mapUrl = path.relative('./', absoluteImgurl);
				newUrl = summary[mapUrl];
				
				grunt.log.debug( 'mapUrl: '+mapUrl);

				if(newUrl){
					newUrl = path.relative(dirname, newUrl);
					ret = matchedWord.replace(imgUrl, newUrl);
					grunt.log.debug('%s exists! the reved file name is %s', mapUrl, newUrl);
				}else{
					ret = matchedWord;
				}			

				return ret;			
			});

			grunt.file.write(filepath, fileContent);
		});
	});
};