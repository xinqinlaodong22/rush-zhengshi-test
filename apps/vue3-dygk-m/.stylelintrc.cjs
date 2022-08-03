module.exports = {
    "extends": [
      "stylelint-config-standard-scss",
      "stylelint-config-standard-vue/scss",
      "stylelint-config-recess-order",
      "stylelint-prettier/recommended"
    ],
    "rules": {
      "selector-class-pattern": [
        "^([a-z][a-z0-9]*)([_-]{1,2}[a-z0-9]+)*$",
        {
          "message": "选择符的命名规则：字母开头，允许小写字母、数字、横线、下划线、双横线、双下划线"
        }
      ]
    }
  }