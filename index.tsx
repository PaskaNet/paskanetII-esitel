/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Sets up an Intersection Observer to reveal elements as they are scrolled into view.
     */
    const setupIntersectionObserver = () => {
        const revealElements = document.querySelectorAll('.reveal');

        const observerOptions = {
            root: null, // observes intersections relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the item must be visible to trigger
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing the element once it has been revealed
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    };

    /**
     * Sets up event listeners for opening and closing modals.
     */
    const setupModalInteractions = () => {
        // Fix: Cast the result of querySelectorAll to NodeListOf<HTMLElement> to access the dataset property.
        const openModalButtons = document.querySelectorAll<HTMLElement>('[data-modal-target]');
        const closeModalButtons = document.querySelectorAll('[data-close-button]');
        const overlay = document.getElementById('overlay');

        const openModal = (modal) => {
            if (modal == null) return;
            modal.classList.add('active');
            overlay.classList.add('active');
        };

        const closeModal = (modal) => {
            if (modal == null) return;
            modal.classList.remove('active');
            overlay.classList.remove('active');
        };

        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget);
                openModal(modal);
            });
        });

        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            });
        });

        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal.active');
                modals.forEach(modal => {
                    closeModal(modal);
                });
            }
        });
    };

    setupIntersectionObserver();
    setupModalInteractions();
});