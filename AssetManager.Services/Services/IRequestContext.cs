using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models;

namespace AssetManager
{
    public interface IRequestContext
    {
        /// <summary>
        /// Gets or sets the user.
        /// </summary>
        /// <value>
        /// The user.
        /// </value>
        User User { get; set; }

        /// <summary>
        /// Updates this instance.
        /// </summary>
        void Update();
    }
}
