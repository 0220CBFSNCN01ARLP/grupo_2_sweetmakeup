module.exports = {
    isAdmin: function(user){
        return (user.roleId == 3)
    },
    isSeller: function(user){
        return (user.roleId == 2)
    },
    isCustomer: function(user){
        return (user.roleId == 1)
    },
}
