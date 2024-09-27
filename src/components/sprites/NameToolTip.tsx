"use client"

import { useState, useEffect, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface InfoTooltipProps {
    name: string;
    content: string;
}

const NameToolTip = ({ name, content }: InfoTooltipProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const triggerRef = useRef<HTMLSpanElement>(null)
    const nameRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }
        const checkOverflow = () => {
            if (nameRef.current) {
                setIsOverflowing(nameRef.current.scrollWidth > nameRef.current.clientWidth)
            }
        }
        checkMobile()
        checkOverflow()
        window.addEventListener('resize', () => {
            checkMobile()
            checkOverflow()
        })
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        const handleScroll = () => {
            setIsOpen(false)
        }
        document.addEventListener('click', handleOutsideClick)
        window.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
        if (isMobile) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
                className="cursor-pointer items-center max-w-min lg:min-w-fit flex-shrink-0 text-ellipsis whitespace-nowrap overflow-hidden"
                asChild
            >
                <span
                    ref={triggerRef}
                    className="cursor-pointer flex items-center w-full"
                    onClick={handleInteraction}
                    onMouseEnter={() => !isMobile && setIsOpen(true)}
                    onMouseLeave={() => !isMobile && setIsOpen(false)}
                >
                    <span
                        ref={nameRef}
                        className="truncate"
                        title={isOverflowing ? name : undefined}
                    >
                        {name}
                    </span>
                    <span className="sr-only">Show information</span>
                </span>
            </PopoverTrigger>
            <PopoverContent>
                <p>{content}</p>
            </PopoverContent>
        </Popover>
    )
}

export { NameToolTip }