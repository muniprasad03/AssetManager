using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Models
{
    public class LoginActivity
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int? UserId { get; set; }

        /// <summary>
        /// Gets or sets the login status.
        /// </summary>
        /// <value>The login status.</value>
        public LoginStatus LoginStatus { get; set; }

        /// <summary>
        /// Gets or sets the username.
        /// </summary>
        /// <value>The username.</value>
        public string UserName { get; set; }

        /// <summary>
        /// Gets or sets the display name.
        /// </summary>
        /// <value>
        /// The display name.
        /// </value>
        public string DisplayName { get; set; }

        /// <summary>
        /// Gets or sets the login time.
        /// </summary>
        /// <value>The login time.</value>
        public DateTime LoginTime { get; set; }

        /// <summary>
        /// Gets or sets the login IP address.
        /// </summary>
        /// <value>The login IP address.</value>
        public string LoginIPAddress { get; set; }

        /// <summary>
        /// Gets or sets the login failure reason.
        /// </summary>
        /// <value>The login failure reason.</value>
        public string LoginFailureReason { get; set; }
    }
}
