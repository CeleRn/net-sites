var fs = require('fs');
var jsonfile = require('jsonfile');
var readYaml = require('read-yaml');
var yaml = require('write-yaml');
var Hexo = require('hexo');


defaultConfig = readYaml.sync('_config.yml');

// Файл со списком поддоменов и данными для них
var file = 'subdomains.json'

// Чтение файла и создание массива со всеми данными
var dataSubdomains = jsonfile.readFileSync(file);

// Создание массива только с поддоменами... [moskow, smolensk, и т.д.]
var subdomains = Object.keys(dataSubdomains);
console.log(subdomains);
for (var i = 0; i < subdomains.length; i++) {

    alias = subdomains[i];
    args = dataSubdomains[alias];

    // Сборка массива для файла конфигурации поддомена
    var currentConfig = new Object;
    // Папка для результата 
    currentConfig.public_dir = "public/" + alias;

    // Место для деплоя 
    currentConfig.deploy = new Object;
    currentConfig.deploy.type = "git";
    currentConfig.deploy.repo = "CeleRn/123";
    currentConfig.deploy.branch = alias;

    // Дополнительные аргументы из основного JSON файла
    currentConfig.subdomain = new Object;
    for (arg in args) {
        currentConfig.subdomain[arg] = args[arg];
    }

    // Имя файла конфигурации для данного поддомена
    currentConfigFile = __dirname + "/configs/" + alias + ".yml"
    // Запись файла конфигурации для данного поддомена
    var configForSubdomain = defaultConfig
    Object.assign(configForSubdomain, currentConfig);
    yaml.sync(currentConfigFile, configForSubdomain);


    // jsonfile.writeFile(currentConfigFile, currentConf, {
    //     spaces: 2
    // }, function (err) {
    //     console.error(err)
    // })
}

function generateSubdomain(alias) {
    hexo = new Hexo(process.cwd(), {
        config: "_config.yml,configs/" + alias + ".yml"
    });

    hexo.init().then(function () {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function () {
        return hexo.exit();
    }).then(function () {
        return "все ок"
    }).catch(function (err) {
        console.log(err);
        hexo.exit(err);
    })
}

function hiFunc(alias, callback) {
    console.log("Запущена генерация домена " + alias);
    callback(alias);
}

// for (var i = 0; i < subdomains.length; i++) {
//     generateSubdomain(subdomains[i]);
// }