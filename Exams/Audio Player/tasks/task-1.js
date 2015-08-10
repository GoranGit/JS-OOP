/**
 * Created by Goran on 7/7/2015.
 */


function solve() {

    function validateString(string) {
        if (string === undefined) {
            throw  new Error
        }
        if (typeof string !== 'string') {
            throw  new Error();
        }
        if (string.length < 3 || string.length > 25) {
            throw  new Error();
        } else {
            return true;
        }
    }

    var playable = (function () {
        var Id = 1;
        var playable = {
            init: function (title, author) {
                this.title = title;
                this.author = author;
                this.id = Id++;
                return this;
            },
            play: function () {
                return this.id + '. ' + this.title + ' - ' + this.author;
            },

            set title(val) {
                validateString(val);
                this._title = val;
                return this;
            },
            get title() {
                return this._title;
            },
            set author(val) {
                validateString(val);
                this._author = val;
                return this;
            },
            get author() {
                return this._author;
            }
        }
        return playable;
    }());

    var audio = (function (parent) {
        var audio = Object.create(parent);
        audio.init = function (title, author, lenght) {
            parent.init.call(this, title, author);
            this.length = lenght;
            return this;
        };
        audio.play = function () {
            return parent.play.call(this) + ' - ' + this.length;
        }
        return audio;
    }(playable));

    var video = (function (parent) {
        var video = Object.create(parent);
        video.init = function (title, author, imdbRating) {
            parent.init.call(this, title, author);
            this.imdbRating = imdbRating;
            return this;
        }

        Object.defineProperty(video, 'imdbRating', {
            set: function (val) {
                if (typeof val != 'number') {
                    throw  new Error();
                }
                if (val < 1 || val > 5) {
                    throw  new Error();
                } else {
                    this._imdbRating = val;
                    return this;
                }
            },
            get: function () {
                return this._imdbRating;
            }
        })

        video.play = function () {
            return parent.play.call(this) + ' - ' + this.imdbRating;
        }
        return video;
    }(playable));

    var playlist = (function () {

        var Id = 1;

        var playlist = {
            init: function (name) {
                this.name = name;
                this.id = Id++;
                this.playable = [];
                return this;
            },
            set name(val) {
                validateString(val);
                this._name = val;
                return this;
            },
            get name() {
                return this._name;
            },
            addPlayable: function (playab) {

                if (playab === undefined) {
                    throw  new Error();
                }
                if (typeof  playab !== 'object') {
                    throw  new Error();
                }
                if (playab.id === undefined) {
                    throw  new Error();
                }
                this.playable.push(playab);
                return this;
            },

            getPlayableById: function (id) {
                var i;

                if (typeof id === 'undefined') {
                    throw  new Error();
                }
                if (typeof id !== 'number') {
                    throw  new Error();
                }

                for (i = 0, len = this.playable.length; i < len; i += 1) {
                    if (id === this.playable[i].id) {
                        break;
                    }
                }
                if (i !== this.playable.length) {
                    return this.playable[i];
                } else {
                    return null;
                }
            },
            removePlayable: function (input) {
                var id;
                if (typeof  input === 'undefined') {
                    throw  new Error();
                }
                if (typeof input === 'object') {
                    id = input.id;
                }
                else {
                    id = input;
                }
                if (typeof id === 'undefined') {
                    throw  new Error();
                }

                for (var i = 0, len = this.playable.length; i < len; i += 1) {
                    var deleted = false;
                    if (this.playable[i].id === id) {
                        len -= 1;
                        this.playable.splice(i, 1);
                        i -= 1;
                        deleted = true;
                        break;
                    }
                }
                if (deleted) {
                    return this;
                } else {
                    throw  new Error();
                }
            },
            listPlayables: function (page, size) {
                if (page * size > this.playable.length) {
                    throw  new Error();
                }
                if (page < 0) {
                    throw  new Error();
                }
                if (size <= 0) {
                    throw  new Error();
                }
                var sorted = this.playable.slice();
                sorted.sort(function (a, b) {
                    if (a.title < b.title) {
                        return -1;
                    } else {
                        if (a.title > b.title) {
                            return 1;
                        } else {
                            if (a.id < b.id) {
                                return -1;
                            } else {
                                if (a.id > b.id) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }

                    }
                }, this);


                return sorted.slice(page * size, page * size + size);


            }
        }

        return playlist;
    }());

    var player = (function () {
        var Id = 1;
        var plr = {
            init: function (name) {
                this.name = name;
                this.playlists = [];
                this.id = Id++;
                return this;
            },
            set name(val) {
                validateString(val);
                this._name = val;
                return this;
            },
            get name() {
                return this._name;
            },
            contains: function (playable, playlist) {
                for (var i = 0, len = this.playlists; i < len; i += 1) {
                    if (playlist.id === this.playlists[i].id) {
                        for (var j = 0, len = this.playlists[i].length; i < len; i += 1) {
                            if (this.playlists[i][j].id === playable.id) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            },

            search: function(pattern){
                var exist = false,result=[];
              for(var i= 0,len = this.playlists;i<len;i+=1)
              {
                  var reg = RegExp(pattern);
                  var pl = this.playlists[i];
                  for(var j = 0,len2 = pl.length;i<len2;i+=1) {
                      if(pl[j]!==undefined ){
                      if (reg.test(pl[j].title)){
                          exist = true;
                          break;
                      }
                      }
                  }
                  if(exist){
                      var copy = pl.slice();
                      result.push({name: copy.name,id: copy.id});
                      exist = false;
                  }
              }
                return result;
            },

            addPlaylist: function (playlistToAdd) {

                if (typeof playlistToAdd !== 'object') {
                    throw  new Error();
                }
                if (playlistToAdd.id === undefined) {
                    throw  new Error();
                }

                this.playlists.push(playlistToAdd);
                return this;

            },
            getPlaylistById: function (id) {
                var i;

                for (i = 0, len = this.playlists.length; i < len; i += 1) {
                    if (id === this.playlists[i].id) {
                        break;
                    }
                }
                if (i !== this.playlists.length) {
                    return this.playlists[i];
                } else {
                    return null;
                }
            },
            removePlaylist: function (input) {
                var id;
                if (typeof input === 'object') {
                    id = input.id;
                } else {
                    id = input;
                }

                for (var i = 0, len = this.playlists.length; i < len; i += 1) {
                    var deleted = false;
                    if (this.playlists[i].id === id) {
                        len -= 1;
                        this.playlists.splice(i, 1);
                        i -= 1;
                        deleted = true;
                    }
                }
                if (deleted) {
                    return this;
                } else {
                    throw  new Error();
                }
            },
            listPlaylists: function (page, size) {
                var playables = this.playlists.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }).sort(function (c, d) {
                    return c.id - d.id;
                });
                var result = [];
                if (page * size > playlists.length) {
                    throw  new Error();
                }
                if (page < 0) {
                    throw  new Error();
                }
                if (size <= 0) {
                    throw  new Error();
                }
                if (size > playlists.length) {
                    return playlists;
                }

                for (var i = paze * size; i < (page + 1) * (size); i += 1) {
                    if (i > playlists.length - 1) {
                        return result;
                    }
                    else {
                        result.push(playlists[i]);
                    }
                }
                return result;

            }

        };
        return plr;
    }());

    var module = {
        getPlayer: function (name) {
            return Object.create(player).init(name);
        },
        getPlaylist: function (name) {
            return Object.create(playlist).init(name);
        },
        getAudio: function (title, author, length) {
            return Object.create(audio).init(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return Object.create(video).init(title, author, imdbRating);
        }

    }

    return module;
}

var count, i, ids, invalidID, j, name, player, playlist, ref;
var result = solve();

name = 'Rock and Roll';
player = result.getPlayer(name);
console.log(player.getPlaylistById('gfjdfkgkd'));//expected to be  null
count = 5;
ids = {};
for (i = j = 0, ref = count; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    playlist = result.getPlaylist(name + i);
    player.addPlaylist(playlist);
    ids[playlist.id] = true;
}
invalidID = (Math.random() * 100000000) | 0;
while (ids[invalidID]) {
    invalidID = (Math.random() * 100000000) | 0;
}
console.log(player.getPlaylistById(invalidID));
//return expect(player.getPlaylist(invalidID)).to.be["null"];
module.exports = solve;